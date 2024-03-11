const Router = require('express');
const router = new Router();
const todoController = require('../controllers/todoController');

router.get('/getTodos', todoController.getTodos)
router.post('/addTodo', todoController.addTodo);
router.delete('/deleteTodo', todoController.deleteTodos);
router.patch('/editTodo', todoController.editTodos);
router.post('/editComplete', todoController.completeTodo)

module.exports = router;
