const express = require('express');
const route = require('./Routes/ChatRoute');
const Controller = require('./Controller/promptController');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Use CORS middleware for all routes
app.use(cors({
  origin: "*", // Replace with your frontend origin for better security
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Use built-in express.json() and express.urlencoded() to handle body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Mount the chatbot routes
app.use('/chatbot/v1', route);

// Error handling middleware (optional, but good for catching errors globally)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "failure",
    message: "Internal server error",
  });
});

module.exports = app;
