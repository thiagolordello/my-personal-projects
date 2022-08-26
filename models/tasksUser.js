const tasksUserModel = (sequelize, DataTypes) => {
  const TasksUser = sequelize.define(
    'TasksUser',
    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },

    },
    {
      underscored: true,
      timestamps: true,
      createdAt: true,
      updatedAt: false,
      tableName: 'tasks_user',
    },
  );

  TasksUser.associate = (models) => {
    TasksUser.belongsTo(models.Users, { foreignKey: 'idUser', as: 'tasksUser' });
  };

  return TasksUser;
};

module.exports = tasksUserModel;
