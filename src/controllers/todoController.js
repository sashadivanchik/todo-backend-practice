const { Todo } = require('../../models/models');
const ApiError = require('../../error/ApiError');

const NOT_FOUND = 'Элемент не найден';
const ERROR_GET_LIST = 'Ошибка получения списка';
const ERROR_ADD_ITEM = 'Ошибка добавления элемента';
const ERROR_EDIT_ITEM = 'Ошибка редактирования элемента';
const ERROR_REMOVE_ITEM = 'Ошибка удаления элемента';

class TodoController {
    async getTodos(req, res, next) {
        const { page, limitItems} = req.query;

        const limit = parseInt(limitItems) || 10;
        const offset = (page - 1) * limit

        try {
            const items = await Todo.findAll({
                order: [['id', 'DESC']],
                limit,
                offset
            });
            const count = await Todo.count();

            res.json({items, count});
        } catch (error) {
            console.error(`${ERROR_GET_LIST}: `, error);
            return next(ApiError.internal(ERROR_GET_LIST));
        }
    }

    async addTodo(req, res, next) {
        const { description, isComplete } = req.body;

        try {
            const item = await Todo.create({
                description,
                isComplete,
            });

            const count = await Todo.count();

            res.status(201).json({ count, item });
        } catch (error) {
            console.error(`${ERROR_ADD_ITEM}: `, error);
            return next(ApiError.internal(ERROR_ADD_ITEM));
        }
    };

    async deleteTodos(req, res, next) {
        const { todoId } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return next(ApiError.badRequest(NOT_FOUND));
            }

            await item.destroy();

            const count = await Todo.count();

            res.status(200).json({ count, item });
        } catch (error) {
            console.error(`${ERROR_REMOVE_ITEM}: `, error);
            return next(ApiError.internal(ERROR_REMOVE_ITEM));
        }
    }

    async completeTodo(req, res, next) {
        const { todoId, isComplete } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return next(ApiError.badRequest(NOT_FOUND));
            }

            await item.update({ isComplete });

            const count = await Todo.count();

            res.status(200).json({ count, item});
        } catch (error) {
            console.error(`${ERROR_EDIT_ITEM}: `, error);
            return next(ApiError.internal(ERROR_EDIT_ITEM));
        }
    }

    async editTodos(req, res, next) {
        const { todoId, description } = req.body;

        try {
            const item = await Todo.findByPk(todoId);

            if (!item) {
                return next(ApiError.badRequest(NOT_FOUND));
            }

            await item.update({ description });

            const count = await Todo.count();

            res.status(200).json({ count, item});
        } catch (error) {
            console.error(`${ERROR_EDIT_ITEM}: `, error);
            return next(ApiError.internal(ERROR_EDIT_ITEM));
        }
    }
}

module.exports = new TodoController()
