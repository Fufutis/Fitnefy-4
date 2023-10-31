const mysql2 = require('mysql2');

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