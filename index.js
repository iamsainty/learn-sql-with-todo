const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (name, username, password) VALUES (?, ?, ?)`;

    db.query(query, [name, username, hashedPassword], (err, result) => {
      if (err) {
        // Check if the username already exists
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Username already exists!" });
        }
        console.error(err.message);
        return res.status(500).json({ error: "Database error!" });
      }

      console.log(result);

      // Success response
      res.status(201).json({ message: "User registered successfully!", result });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error!" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the SQL To-Do App");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
