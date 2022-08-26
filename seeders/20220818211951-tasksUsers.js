module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('tasks_user', [{
      id_user: 1,
      description: 'estudar o back end',
      status: 'pendente',
    },
    {
      id_user: 1,
      description: 'apender uma nova linguagem',
      status: 'pendente',
    },
    {
      id_user: 1,
      description: 'aplicar para processos seletivos',
      status: 'pendente',
    },
    {
      id_user: 1,
      description: 'refazer o git hub',
      status: 'pendente',
    },
    {
      id_user: 1,
      description: 'movimentar o linkedin',
      status: 'pendente',
    },
    {
      id_user: 1,
      description: 'atualizar a planilha de tarefas semanais',
      status: 'pendente',
    },
    {
      id_user: 2,
      description: 'Iniciar os estudos em CSS',
      status: 'pendente',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tasks_user', null, {});
  },
};
