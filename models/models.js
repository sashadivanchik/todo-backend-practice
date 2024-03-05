const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Todo = sequelize.define('todo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: { type: DataTypes.STRING },
    isComplete: { type: DataTypes.BOOLEAN }
})

module.exports = {
    Todo
};
