const UsersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'users',
    },
  );

  Users.associate = (models) => {
    Users.hasMany(models.TasksUser, { foreignKey: 'idUser', as: 'tasksUser' });
  };

  return Users;
};

module.exports = UsersModel;
