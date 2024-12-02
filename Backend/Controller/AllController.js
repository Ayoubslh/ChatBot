const { GoogleGenerativeAI } = require("@google/generative-ai");
const { error } = require("console");
const dotenv = require('dotenv');
const fs = require('fs');
const mime = require('mime-types');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

let convohistory = [];

exports.Generate = async (req, res) => {
    try {
        let imagepath = req.body.image ||null;
        let imagePart = null;

        function fileToGenerativePart(path, mimeType) {
            return {
              inlineData: {
                data: Buffer.from(fs.readFileSync(path)).toString("base64"),
                mimeType,
              },
            };
          }

        if (imagepath) {
            imagePart = fileToGenerativePart(imagepath,'image/*');
           
        }

        const prompt = req.body.prompt || '';
        convohistory.push({ role: 'user', message: prompt });

        const chat = model.startChat({
            history: convohistory.map(entry => ({
                role: entry.role,
                parts: [{ text: entry.message }],
            })),
        });

        const result = await chat.sendMessage([prompt]);
        console.log('API Response:', result);

        if (!result || !result.response || typeof result.response.text !== 'function') {
            return res.status(500).json({
                status: 'failure',
                message: 'No valid response from the generative model',
            });
        }

        const text = result.response.text() || '';
        if(!text) throw new error('No text in response')
        convohistory.push({ role: 'model', message: text });

        res.status(200).json({
            status: 'success',
            data: {
                result: text,
            },
        });
    } catch (err) {
        console.error('Error during generation:', err);
        res.status(500).json({
            status: 'failure',
            message: `An error occurred while generating content: ${err.message}`,
        });
    }
};
