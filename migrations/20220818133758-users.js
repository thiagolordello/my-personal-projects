module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('users', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },

    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  }),

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
