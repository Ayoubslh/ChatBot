

exports.handleAISocket=(socket)=> {
  socket.on("generate-message", async ({ prompt }) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://async.us",
          "X-Title": "async.us",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          stream: true,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      const decoder = new TextDecoder();

      for await (const chunk of response.body) {
        const text = decoder.decode(chunk, { stream: true });
        const lines = text.split("\n").filter(line => line.startsWith("data:"));

        for (const line of lines) {
          const json = line.replace("data: ", "");
          if (json === "[DONE]") {
            socket.emit("stream-end");
            return;
          }
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            socket.emit("stream-data", content);
          }
        }
      }
    } catch (err) {
      console.error(err);
      socket.emit("stream-error", err.message);
    }
  });
};
