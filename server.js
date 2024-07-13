const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'guest1',
  password: 'psdpassword!',
  database: 'fitnefy_db'
});

// Configure CORS options
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the MySQL server');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'src', 'html')));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

// Handle login requests
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received', username);

  try {
    // Query the database for the user
    const [results] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length > 0) {
      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        console.log('Login successful for user', username);
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.warn('Incorrect password for user', username);
        res.status(401).json({ message: 'Incorrect username or password' });
      }
    } else {
      console.warn('No user found with username', username);
      res.status(401).json({ message: 'Incorrect username or password' });
    }
  } catch (err) {
    console.error('Server error during login', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Handle registration requests
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  console.log('Registration request received:', username, password, email);

  try {
    if (!username || !password || !email) {
      throw new Error('Missing required fields');
    }

    // Check if the username or email already exists
    const [existingUsers] = await db.promise().query('SELECT username, email FROM users WHERE username = ? OR email = ?', [username, email]);
    if (existingUsers.length > 0) {
      const existingUsernames = existingUsers.map(user => user.username);
      const existingEmails = existingUsers.map(user => user.email);
      
      if (existingUsernames.includes(username)) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (existingEmails.includes(email)) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Hash the password and insert the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    await db.promise().query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);
    console.log('Registration successful for user:', username);
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Server error during registration:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// General SQL commands for quick reference
// mysql -u guest1 -p
// Enter password when prompted
// CREATE DATABASE fitnefy_db;
// USE fitnefy_db;
// CREATE TABLE users (
// id INT AUTO_INCREMENT PRIMARY KEY,
// username VARCHAR(255) NOT NULL,
// password VARCHAR(255) NOT NULL,
// email VARCHAR(255) NOT NULL
// );

// Sample SQL commands
// INSERT INTO users (username, password, email) VALUES ('guest1', 'hashed_password', 'guest1@example.com');
// SELECT * FROM users;
// UPDATE users SET password = 'new_hashed_password' WHERE username = 'guest1';
// DELETE FROM users WHERE username = 'fufu';
// INSERT INTO users (username, password, email) VALUES ('guest2', 'psdpassword!', 'guest1@example.com');
