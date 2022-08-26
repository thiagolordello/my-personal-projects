const {
  getAllTaskByUser, createTask, updateTask, removeTask, getOneTask,
} = require('../services');

const tasksByUserContrl = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAllTaskByUser(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTasks = async (req, res) => {
  try {
    const {
      idUser, description, status,
    } = req.body;
    await createTask({ idUser, description, status });
    return res.status(201).json({ idUser, description, status });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putTask = async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  try {
    const taskUpdate = await updateTask(id, description, status);
    if (taskUpdate === null) return res.status(404).json({ message: 'Tarefa não existente ou não encontrada' });
    return res.status(204).json(taskUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskForRemove = await removeTask(id);
    if (!taskForRemove) return res.status(404).end();
    return res.status(204).json({ message: 'Tarefa removida com sucesso!' }).end();
  } catch (error) {
    return res.status(500).end();
  }
};

const oneTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await getOneTask(id);
    if (task == null) return res.status(404).json({ message: 'Tarefa não existente ou não encontrada' });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = {
  tasksByUserContrl,
  createTasks,
  putTask,
  deleteTask,
  oneTaskById,
};
