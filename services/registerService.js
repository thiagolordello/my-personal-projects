const md5 = require('md5');
const { Users } = require('../models');

const registerUserService = async (name, password) => {
  const encdodedPass = md5(password);

  // if(name && password == '') console.log('ta vazio');
  // console.log('password:', password)
  // const ifUserexists = await Users.findOne({ where: { name, password } });
  const ifNameExists = await Users.findOne({ where: { name } });

  if (ifNameExists != null) return null;

  const result = await Users.create({
    name, password: encdodedPass,
  });

  return result;
};

module.exports = { registerUserService };
