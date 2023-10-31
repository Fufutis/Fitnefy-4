const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
//it should make it easier to register users in express.js
const port = 3000; // Change to a port number that is not in use


//const port = 3306;
//port can be found in the mysql workbench
//nvm that last note is for the mysql server and the port is 3306 is already in use we want a fresh one

const db = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'guest1',
  password: 'psdpassword!',
  database: 'mydb'
});

/*
-- Create a new user
CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant privileges on a specific database
GRANT SELECT, INSERT, UPDATE, DELETE ON your_database.* TO 'your_user'@'localhost';
*/
/* 
if you already have a selected schema then do
-- Select your desired database (schema)
USE your_database;

-- Grant privileges on all tables in the selected schema
GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'your_user'@'localhost';
*/

/*
-- Create a guest role
CREATE ROLE guest1;

-- Grant privileges to the guest role
GRANT SELECT ON *.* TO guest1;

-- Assign the guest role to the user
GRANT guest1 TO 'guest1'@'localhost';
*/
// Serve your HTML registration form here (you need to create the HTML form).
app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission.
app.post('/index', (req, res) => {
  const { username, password } = req.body;

  // Hash the user's password using bcrypt.
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      // Handle the error.
      res.send('Error hashing the password.');
    } else {
      // Insert the user's data into the database.
      db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if (err) {
          // Handle the database error.
          res.send('Registration failed.');
        } else {
          // Registration was successful.
          res.send('Registration successful.');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the MySQL server');
});

db.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ' + err.message);
      return;
    }
    console.log('Disconnected from the MySQL server');
  });