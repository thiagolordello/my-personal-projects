// const md5 = require('md5');
const { Users } = require('../models');
const { JWTGenerator } = require('../helpers/JWTgenerate');

const loginUser = async (nameUser, passwordUser) => {
  /* const validPassword = md5(passwordUser); */

  const result = await Users.findOne({ where: { name: nameUser, password: passwordUser } });
  if (!result) return null;

  const { name, /* password, */ id } = result;

  const jwt = JWTGenerator({ data: nameUser, id });

  return {
    name,
    /* password, */
    token: jwt,
  };
};

module.exports = {
  loginUser,
};
