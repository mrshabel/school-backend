const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.JWT_SECRET;
// hashing passwords
const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const passwordVerified = await bcrypt.compare(password, hashedPassword);

  return passwordVerified;
};

const generateToken = (payload, expiry) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiry });

  return token;
};

module.exports = { securePassword, generateToken, comparePassword };
