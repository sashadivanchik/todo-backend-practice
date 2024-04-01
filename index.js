require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const router = require('./src/routes/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

// обработка ошибок должна быть в самом конце
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,() => console.log(`Server start on port ${PORT}`));

    } catch (e) {
        console.log(e)
    }
};

start()
