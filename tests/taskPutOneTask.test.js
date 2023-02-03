const chai = require('chai');
const { expect } = require('chai');

const chaiHttp = require('chai-http');
const app = require('../app');
// const { response } = require('../app');

chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

const tokenUser = { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9hbyIsImlkIjo0LCJpYXQiOjE2NzI5NzIyNjMsImV4cCI6MTY4MDc0ODI2M30.aSkWcilgYkp--YWZPl3GKnUCPWldJp3gK1yETG7CCYQ' };
// let's set up the data we need to pass to the login method

const badTokenUser = { Authorization: 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9hbyIsImlkIjo0LCJpYXQiOjE2NzI5NzIyNjMsImV4cCI6MTY4MDc0ODI2M30.aSkWcilgYkp--YWZPl3GKnUCPWldJp3gK1yETG7CCYQ' };

const notToken = {};

const newTaskEdited = {
  description: 'Pinar projetos pessoais no github',
  status: 'Concluido',
};

const userTask = {
  idUser: 4,
  description: 'Correr de manha',
  status: 'Pendente',
};

const notIdUserTask = {

  description: 'correr de manha',
  status: 'Pendente',
};

const notDescripUserTask = {
  idUser: 4,
  status: 'Pendente',
};

const notStatusUserTask = {
  idUser: 4,
  description: 'Correr de manha',
};

describe('Testes PUT da rota /idTask', (done) => {
  let token;
  // let idUser

  const sendReqTasksByUser = async (tkn) => {
    const response = await (requester.put('/tasks/68/').set(tkn).send(newTaskEdited));
    token = response.body.token;
    // const idUser = response.body.idUser;
    // console.log('response: ', response);
    return response;
  };

  const sendReqTasksByUser2 = async (tkn) => {
    const response = await (requester.put('/tasks/170000/').set(tkn).send(newTaskEdited));
    token = response.body.token;
    return response;
  };

  // before(async () => await sendReqTasksByUser2());
  // beforeEach(async () => await sendReqTasksByUser2());

  it('Retorna o status 204,quando a requisicao put for bem sucedida', async () => {
    const response = await sendReqTasksByUser(tokenUser);

    expect(response.statusCode).to.be.equal(204);
    // expect(response.body).to.deep.equal(tasksUser);
  });

  it('Retorna o status 401 e mensagem, quando o token enviado no header nao e valido!', async () => {
    const response = await sendReqTasksByUser(badTokenUser);

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.message).to.be.equal('invalid token');
  });

  it('Retorna o status 401 e mensagem, quando o token for ausente no header!', async () => {
    const response = await sendReqTasksByUser(notToken);

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.error).to.be.equal('Token não encontrado');
  });

  it('Retorna o status 404 e mensagem, quando o id da tarefa informada nao existir', async () => {
    const response = await sendReqTasksByUser2(tokenUser);

    expect(response.statusCode).to.be.equal(404);
    expect(response.body.error).to.be.equal('Tarefa não existente ou não encontrada');
  });
});
