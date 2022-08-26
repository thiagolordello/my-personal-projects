const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const user = jwt.verify(token, fs.readFileSync('jwt.evaluation.key', 'utf-8'));
    req.tokenData = user.data;

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
