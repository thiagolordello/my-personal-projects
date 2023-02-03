const {
  getAllTaskByUser, createTask, updateTask, removeTask, getOneTask,
} = require('../services');

const tasksByUserContrl = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getAllTaskByUser(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTasks = async (req, res) => {
  try {
    const {
      idUser, description, status,
    } = req.body;
    // if (((idUser === undefined) || (description === undefined) || (status === undefined) || (status === '') || (description === ''))) {
    //   return res.status(401)
    //     .json({ message: 'Dados invalidos! Uma ou mais entradas não foram informadas! Verifique a requisiçao enviada.' });
    // }
    await createTask({ idUser, description, status });
    return res.status(201).json({ idUser, description, status });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putTask = async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  // console.log('DESCRIPTION: ', id, description, status.data.status);
  try {
    const taskUpdate = await updateTask(id, description, status);
    if (taskUpdate === null) return res.status(404).json({ error: 'Tarefa não existente ou não encontrada' });
    return res.status(204).json(taskUpdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskForRemove = await removeTask(id);
    if (!taskForRemove) return res.status(404).json({ error: 'Tarefa não existente ou não encontrada' }).end();
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
    return res.status(200).json(task);
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
