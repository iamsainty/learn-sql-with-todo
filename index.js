const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the SQL To-Do App');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});