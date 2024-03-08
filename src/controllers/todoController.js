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
        const { todoId } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            await item.destroy();

            const remainingItems = await Todo.findAll();
            res.json(remainingItems);
        } catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }

    async editTodos(req, res) {

    }
}

module.exports = new TodoController()
