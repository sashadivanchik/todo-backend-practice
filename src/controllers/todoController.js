const { Todo } = require('../../models/models');


class TodoController {
    async getTodos(req, res) {
        try {
            const items = await Todo.findAll({
                order: [['id', 'ASC']]
            });
            res.json(items);
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

            const allItems = await Todo.findAll({
                order: [['id', 'ASC']]
            });

            res.status(201).json(allItems);
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

            const remainingItems = await Todo.findAll({
                order: [['id', 'ASC']]
            });
            res.json(remainingItems);
        } catch (error) {
            console.error('Error deleting item:', error);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }

    async completeTodo(req, res) {
        const { todoId, isComplete } = req.body;
        console.log('isComp', todoId, isComplete)
        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return res.status(404).json({ error: 'Item not found' });
            }

            await item.update({ isComplete });

            const remainingItems = await Todo.findAll({
                order: [['id', 'ASC']]
            });
            res.json(remainingItems);
        } catch (error) {
            console.error('Error updating item:', error);
            res.status(500).json({ error: 'Failed to update item' });
        }
    }

    async editTodos(req, res) {

    }
}

module.exports = new TodoController()
