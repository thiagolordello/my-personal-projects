const md5 = require('md5');
const service = require('../services/index');
// const { token } = require('../helpers/JWTgenerate');
// const { Users } = require('../models/users');

const userLogin = async (req, res) => {
  const { name, password } = req.body;
  const encdodedPass = md5(password);
  try {
    const alreadyExist = await service.loginUser(name, encdodedPass);

    if (alreadyExist === null) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(alreadyExist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
  /* try {
    const user = await Users.findOne({ where: { name, password } });
    if (!user) { return res.status(400).send({ message: 'Invalid fields' }); }
    const tokenJwt = token({ id: user.id, password });
    return res.status(200).json({ message: 'Login efetuado com sucesso', token: tokenJwt });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  } */
};

module.exports = {
  userLogin,
};
