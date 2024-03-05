const Router = require('express');
const router = new Router();
const userTodos = require('./todoRoutes');

router.use('/todos', userTodos)

module.exports = router;
