const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'guest1',
  password: 'psdpassword!',
  database: 'fitnefy_db'
});

const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the MySQL server');
});

app.use(express.static(path.join(__dirname, 'src', 'html')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'html', 'index.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received', username);

  try {
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

app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  console.log('Registration request received:', username, password, email);

  try {
    if (!username || !password || !email) {
      throw new Error('Missing required fields');
    }

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

