module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [{
      name: 'thiago',
      password: 'trybe123',
    },
    {
      name: 'fabio',
      password: 'trybe456',
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
