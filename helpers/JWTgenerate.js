const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const JWTGenerator = (data) => {
  const jwtconfig = {
    expiresIn: '90d',
    algorithm: 'HS256',
  };

  return jwt.sign(data, SECRET, jwtconfig);
};
const VerifyToken = (data, secret) => {
  jwt.verify(data, secret);
};

module.exports = {
  JWTGenerator,
  VerifyToken,
  SECRET,
};
