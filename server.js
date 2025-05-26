const dotenv=require('dotenv');
const { Server } = require('socket.io');
const http = require('http');
const controller= require('./Controller/deepseek'); 

dotenv.config()


const app= require('./app');

const port=process.env.PORT || 3000;

const server = http.createServer(app); 
const io = new Server(server, {
  cors: { origin: "*" }
});


io.on('connection', (socket) => {
  console.log('New client connected');
  controller.handleAISocket(socket); // 👈 pass the socket to controller
});
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)

})