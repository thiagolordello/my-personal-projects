const chai = require('chai');
const { expect } = require('chai');

const chaiHttp = require('chai-http');
const app = require('../app');
// const { response } = require('../app');

chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

const tokenBadUser = { Authorization: '123456' };
const notToken = {};
const tokenUser = { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiam9hbyIsImlkIjo0LCJpYXQiOjE2NzI5NzIyNjMsImV4cCI6MTY4MDc0ODI2M30.aSkWcilgYkp--YWZPl3GKnUCPWldJp3gK1yETG7CCYQ' };
const tasksUser = [
  {
    id: 27,
    idUser: 4,
    description: 'Aplicar para vagas no trybejobs',
    status: 'Concluido',
    createdAt: '2022-09-13T23:47:41.000Z',
  },
  {
    id: 29,
    idUser: 4,
    description: 'Treinar lógica no Codewars',
    status: 'Pendente',
    createdAt: '2022-09-17T12:46:43.000Z',
  },
  {
    id: 68,
    idUser: 4,
    description: 'Pinar projetos pessoais no github',
    status: 'Concluido',
    createdAt: '2023-01-25T23:11:42.000Z',
  },
];

describe('Testes GET da rota /tasks/idUser', (done) => {
  let token;

  const sendReqTasksByUser = async (tkn) => {
    const response = await (requester.get('/tasks/4').set(tkn));
    token = response.body.token;
    return response;
  };

  const sendReqTasksByUser2 = async () => {
    const response = await (requester.get('/tasks/4').set(tokenUser));
    token = response.body.token;
    return response;
  };

  before(async () => await sendReqTasksByUser2());
  beforeEach(async () => await sendReqTasksByUser2());

  it('Retorna o status 200,quando a requisicao get for bem sucedida e valida o retorno das tasks do usuario!', async () => {
    const response = await sendReqTasksByUser(tokenUser);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.deep.equal(tasksUser);
  });

  it('Retorna o status 401 e mensagem, quando o token enviado no header nao e valido!', async () => {
    const response = await sendReqTasksByUser(tokenBadUser);

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.message).to.be.equal('jwt malformed');
  });

  it('Retorna o status 401 e mensagem, quando o token for ausente no header!', async () => {
    const response = await sendReqTasksByUser(notToken);

    expect(response.statusCode).to.be.equal(401);
    expect(response.body.error).to.be.equal('Token não encontrado');
  });
});
