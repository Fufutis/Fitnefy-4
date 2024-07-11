const bcrypt = require('bcrypt');

const hashPassword = async () => {
  const password = 'psdpassword!';
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
};

hashPassword();
