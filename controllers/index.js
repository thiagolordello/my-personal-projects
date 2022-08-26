const { registerController } = require('./usersController');
const { userLogin } = require('./loginController');
const {
  tasksByUserContrl, createTasks, putTask, deleteTask, oneTaskById,
} = require('./tasks.Controller');

module.exports = {
  registerController,
  userLogin,
  tasksByUserContrl,
  createTasks,
  putTask,
  deleteTask,
  oneTaskById,
};
