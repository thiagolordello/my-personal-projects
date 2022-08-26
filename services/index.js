const { registerUserService } = require('./registerService');
const { loginUser } = require('./loginService');
const {
  getAllTaskByUser, getOneTask, createTask, updateTask, removeTask,
} = require('./tasksService');

module.exports = {
  registerUserService,
  loginUser,
  getAllTaskByUser,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
};
