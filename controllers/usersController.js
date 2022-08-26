const { registerUserService } = require('../services');

const registerController = async (req, res) => {
  const { name, password } = req.body;
  // console.log('log do body: ', req.body);
  try {
    const result = await registerUserService(name, password);
    if (result === null) return res.status(409).json({ message: 'Usuario existente!' });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerController,
};
