const chai = require('chai');
const { expect } = require('chai');

const chaiHttp = require('chai-http');
const app = require('../app');
// const { response } = require('../app');

chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();
// let's set up the data we need to pass to the login method
const userCredentials = {
  name: 'joao',
  password: 'trybe123',
};

const userCredentialsBad = {
  name: 'joao',
  password: 'trybe@12',
};

const notNameCredentials = {
  name: '',
  password: 'trybe@12',
};

const notPassCredentials = {
  name: 'joao',
  password: '',
};

describe('Testes da rota /login', (done) => {
  let token;
  const makeLogin = async () => {
    const response = await requester.post('/login').send(userCredentials);
    token = response.body.token;
    return response;
  };

  const makeLoginBad = async () => {
    const response = await requester.post('/login').send(userCredentialsBad);
    token = response.body.token;
    return response;
  };

  const loginWithouthName = async () => {
    const response = await requester.post('/login').send(notNameCredentials);
    token = response.body.token;
    return response;
  };

  const loginWithouthPass = async () => {
    const response = await requester.post('/login').send(notPassCredentials);
    token = response.body.token;
    return response;
  };
 before(async () => await makeLogin());
 beforeEach(async () => await makeLogin());

  it('Retorna o status 200,quando o login for bem sucedido!', async () => {
    const response = await makeLogin();

    expect(response.statusCode).to.be.equal(200);
  });

  it('Retorna o status 404,quando o login nao for bem sucedido!', async () => {
    const response = await makeLoginBad();

    expect(response.statusCode).to.be.equal(404);
  });

  it('Quando o nome nao for informado, retorna uma mensagem e o status 404', async () => {
    const response = await loginWithouthName();

    expect(response.statusCode).to.be.equal(404);
    expect(response.body.message).to.be.equal('Usuário ou senha não encontrado');
  });

  it('Quando a senha nao for informada, retorna uma mensagem e o status 404', async () => {
    const response = await loginWithouthPass();

    expect(response.statusCode).to.be.equal(404);
    expect(response.body.message).to.be.equal('Usuário ou senha não encontrado');
  });
});
