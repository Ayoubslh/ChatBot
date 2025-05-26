ChatBot Server
This project is a server-side application designed to interface with Large Language Models (LLMs) such as DeepSeek and Gemini. It provides a RESTful API to facilitate seamless integration of LLM capabilities into various applications.

Features
LLM Integration: Connects with DeepSeek and Gemini APIs to leverage advanced language processing.

RESTful API: Exposes endpoints for easy interaction with the chatbot functionalities.

Modular Architecture: Organized codebase with separate controllers and routes for scalability and maintainability.

Environment Configuration: Utilizes environment variables for sensitive configurations.
GitHub

Prerequisites
Node.js (version 14 or higher)

npm (Node Package Manager)

DeepSeek API Key (if using DeepSeek)

Gemini API Key (if using Gemini)


Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Ayoubslh/ChatBot.git
cd ChatBot
Install dependencies:

bash
Copy code
npm install
Configure environment variables:

Create a .env file in the root directory.

Add your API keys and other configurations:

env
Copy code
DEEPSEEK_API_KEY=your_deepseek_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
Running the Server
bash
Copy code
node server.js
The server will start on the port specified in your .env file (default is 3000).
GitHub

API Endpoints
POST /api/chat/deepseek
Send a message to the DeepSeek LLM.

POST /api/chat/gemini
Send a message to the Gemini LLM.
GitHub

Each endpoint expects a JSON payload:

json
Copy code
{
  "message": "Your message here"
}
The response will contain the LLM's reply.
GitHub

Project Structure
pgsql
Copy code
ChatBot/
├── Controller/
│   └── chatController.js
├── Routes/
│   └── chatRoutes.js
├── node_modules/
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── server.js
Controller/: Contains the logic for handling API requests.

Routes/: Defines the API endpoints and associates them with controller functions.

app.js: Sets up the Express application.

server.js: Starts the server and listens on the specified port.
GitHub


License
This project is licensed under the MIT License.
GitHub

Contact
For questions or feedback, please open an issue on the GitHub repository.

