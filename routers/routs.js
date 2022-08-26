const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');
const tasksByUserContrl = require('./tasksRouter');
const putTask = require('./tasksRouter');

module.exports = {
  registerRouter,
  loginRouter,
  tasksByUserContrl,
  putTask,
};
