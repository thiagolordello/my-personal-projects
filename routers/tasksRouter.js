const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

router.get('/:id', controllers.tasksByUserContrl); // getAll de todas as tarefas de um usuário pega pelo id dele(idUser)
router.get('/onetask/:id', controllers.oneTaskById); // get por id de uma tarefa
router.post('/', controllers.createTasks);
router.put('/:id', controllers.putTask);
router.delete('/:id', controllers.deleteTask);

module.exports = router;
