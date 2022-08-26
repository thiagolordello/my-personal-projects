module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('tasks_user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    id_user: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE,
    },
  }),

  down: async (queryInterface) => {
    await queryInterface.dropTable('tasks_user');
  },
};
