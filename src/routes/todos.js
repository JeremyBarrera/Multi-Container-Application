const express = require('express');
const router = express.Router();
const controller = require('../controllers/todosController');

router.get('/', controller.getTodos);
router.get('/:id', controller.getTodosById);
router.post('/', controller.createTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;