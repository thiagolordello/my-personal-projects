const { Users } = require('../models');

const nameExists = async (req, res, next) => {
  const { name } = req.body;

  try {
    if (!name) return res.status(400).send({ message: '"name" is required' });

    const existEmail = await Users.findOne({ where: { name } });
    if (existEmail) return res.status(409).send({ message: 'Nome ja registrado. Tente outro.' });

    next();
  } catch (error) {
    next(error);
  }
  return null;
};

const nameValidates = async (req, res, next) => {
  const { name } = req.body;

  try {
    if (name.length < 8) {
      return res.status(400)
        .send({ message: '"name" length must be at least 8 characters long' });
    }
    next();
  } catch (error) {
    next(error);
  }
  return null;
};

const passwordValidates = async (req, res, next) => {
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400)
        .send({ message: 'A "senha" é obrigatória' });
    }

    if (password.length < 6) {
      return res.status(400).send({ message: '"A senha deve conter ao menos 6 caracteres' });
    }
    next();
  } catch (error) {
    next(error);
  }
  return null;
};

module.exports = {
  nameValidates,
  passwordValidates,
  nameExists,
};
