const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const userRoutes = require('./routes/userRoutes');
const { serverConfig } = require('./utils/variables');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(bodyParser.json());
app.use(logger);

app.use('/api', userRoutes);
app.use('/api', paymentRoutes);

app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' });
});

module.exports = app;
