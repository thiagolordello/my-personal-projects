// const moment = require('moment');
const { TasksUser } = require('../models');

const getAllTaskByUser = async (id) => {
  const result = await TasksUser.findAll({
    where: { id_user: id },
  });
  return result;
};

const createTask = async (idUser, description, status) => {
  // const newTask = {
  //   idUser,
  //   description,
  //   status,
  //   createdAt: moment().format(),
  // };
  const result = await TasksUser.create(idUser, description, status);
  return result;
};

const getOneTask = async (id) => {
  const result = await TasksUser.findByPk(id);
  if (!result) return null;
  return result;
};

const updateTask = async (id, description, status) => {
  const updatedNow = await TasksUser.findByPk(id, {
    attributes: { exclude: ['id', 'idUser', 'createdAt'] },
  });
  if (!updatedNow) return null;
  // const  { description, status } = req.body;
  const result = await TasksUser.update(
    { description, status },
    {
      where: { id },
    },
  );
  if (!result) return null;

  return result;
};

const removeTask = async (id) => {
  const task = await TasksUser.destroy({ where: { id } });
  if (!task) return null;
  return task;
};

module.exports = {
  getAllTaskByUser,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
};
