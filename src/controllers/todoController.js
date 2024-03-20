const { Todo } = require('../../models/models');


class TodoController {
    async getTodos(req, res) {
        const { limitItems, offsetItems } = req.query;

        const limit = parseInt(limitItems) || 10;
        const offset = parseInt(offsetItems) || 0;

        try {
            const items = await Todo.findAll({
                order: [['id', 'DESC']],
                limit,
                offset
            });
            const count = await Todo.count();

            res.json({items, count});
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    }

    async addTodo(req, res) {
        const { description, isComplete } = req.body;

        try {
            await Todo.create({
                description,
                isComplete,
            });

            const items = await Todo.findAll({
                order: [['id', 'DESC']]
            });

            const count = await Todo.count();

            res.status(201).json({items, count});
        } catch (error) {
            console.error('Error adding item:', error);
            res.status(500).json({ error: 'Failed to add item' });
        }
    };

    async deleteTodos(req, res) {
        const { todoId } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            await item.destroy();

            const items = await Todo.findAll({
                order: [['id', 'DESC']]
            });

            const count = await Todo.count();

            res.status(200).json({items, count});
        } catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }

    async completeTodo(req, res) {
        const { todoId, isComplete } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            await item.update({ isComplete });

            const items = await Todo.findAll({
                order: [['id', 'DESC']]
            });

            const count = await Todo.count();

            res.status(200).json({items, count});
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Failed to update item' });
        }
    }

    async editTodos(req, res) {
        const { todoId, description } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            await item.update({ description });

            const items = await Todo.findAll({
                order: [['id', 'DESC']]
            });

            const count = await Todo.count();

            res.status(200).json({items, count});
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Failed to update item' });
        }
    }
}

module.exports = new TodoController()
