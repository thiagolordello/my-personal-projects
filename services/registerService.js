const md5 = require('md5');
const { Users } = require('../models');

const registerUserService = async (name, password) => {
  const encdodedPass = md5(password);

  const ifUserexists = await Users.findOne({ where: { name, password } });

  if (ifUserexists) return null;
  const result = await Users.create({
    name, password: encdodedPass,
  });
  // console.log('RESULT: ', result);
  return result;
};

module.exports = { registerUserService };
