const { registerUserService } = require('../services');

const registerController = async (req, res) => {
  const { name, password } = req.body;
  if ((name === '') && (password === '')) return res.status(401).json({ error: 'Usuario e senha nao informados na criacao de usuario' });
  if ((name === '') || (password === '')) return res.status(401).json({ error: 'Usuario ou senha nao informados na criacao de usuario' });

  try {
    const result = await registerUserService(name, password);
    if (result === null) return res.status(409).json({ message: 'Usuario ja existente. Tente outro username!' });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerController,
};
