const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  const secret = process.env.JWT_SECRET;
  const isVerified = await jwt.verify(token, secret);
  return isVerified;
};

module.exports = verifyToken;
