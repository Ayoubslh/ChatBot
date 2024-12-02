const express =require('express');
const route=require('./Routes/ChatRoute');
const Controller=require('./Controller/AllController');
const cors = require('cors')
const bodyParser=require('body-parser')

const allowedOrigins =['http://localhost:5174','http://127.0.0.1:5500/Frontend/index.html']

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: '*',
  
}));
  app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use('/chatbot/v1',route);

module.exports = app;

