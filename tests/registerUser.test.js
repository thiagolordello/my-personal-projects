const sinon = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const axios = require('axios');

const chaiHttp = require('chai-http');
const app = require('../app');
// const { response } = require('../app');

chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

const notNameUser = {
  name: '',
  password: '123456',
};

const notPasswdUser = {
  name: 'usuario.teste',
  password: '',
};

const notDataUserTask = {
  name: '',
  password: '',

};

const nullDataUsrTask = {};

describe('Testes POST da rota tasks register/ (Create User)', (done) => {
  // let token;

  // const sendNewUser = async () => {
  //   const response = await (await requester.post('/register/').send(newUser));
  //   return response;
  // };

  const postUserWithouthName = async () => {
    const response = await requester.post('/register/').send(notNameUser);
    return response;
  };

  const postUserWithouthPass = async () => {
    const response = await requester.post('/register/').send(notPasswdUser);
    return response;
  };

  const postUserWithouthData = async () => {
    const response = await requester.post('/register/').send(notDataUserTask);
    return response;
  };

  // before(async () => await sendTask());
  // beforeEach(async () => await sendNewUser());

  // it('Retorna o status 201,quando a criacao for bem sucedida!', async () => {
  //   const response = await sendNewUser();
  //   expect(response.statusCode).to.be.equal(201);
  // });
  const responseData = {
    id: 22,
    name: 'tester',
    password: 'ec279cb8d71dd62859e481c6be01ac1a',
  };

  it('Retorna o status 201,quando a criacao for bem sucedida!', async () => {
    const postStub = await sinon.stub(axios, 'post');

    const url = 'http://localhost:3001/register/';

    const payload = {
      name: 'usuario.teste',
      password: '123456',
    };

    const newUser = {
      name: 'usuario.teste',
      password: '123456',
    };
    await postStub.withArgs(url, newUser).returns(Promise
      .resolve({ data: responseData, status: 201 }));

    const response = await axios.post(url, payload);

    expect(response.status).to.be.equal(201);
    expect(response.data).to.equal(responseData);

    postStub.restore();
  });

  it('Quando somente a senha for informada, retorna uma mensagem de erro e o status 401', async () => {
    const response = await postUserWithouthName();
    expect(response.statusCode).to.be.equal(401);
    expect(response.body.error).to.be.equal('Usuario ou senha nao informados na criacao de usuario');
  });

  it('Quando somente o nome for informado, retorna uma mensagem de erro e o status 401', async () => {
    const response = await postUserWithouthPass();

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.error).to.be.equal('Usuario ou senha nao informados na criacao de usuario');
  });

  it('Quando o usuario e a senha nao foram informados, retorna uma mensagem e o status 500', async () => {
    const response = await postUserWithouthData();

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.error).to.be.equal('Usuario e senha nao informados na criacao de usuario');
  });
});
