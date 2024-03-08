const { Todo } = require('../../models/models');


class TodoController {
    async getTodos(req, res) {
        try {
            const items = await Todo.findAll();
            res.json(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    }

    async addTodo(req, res) {

    }

    async deleteTodos(req, res) {

    }

    async editTodos(req, res) {

    }
}

module.exports = new TodoController()
