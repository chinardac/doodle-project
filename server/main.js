import express from 'express';

import logger from './middlewares/logger';

const app = express();
const port = 3000;

app.locals = {
    hostname: 'localhost',
    port,
    protocol: 'http:'
};

app.use(logger);

const mainDevelopment = require('./main.development');
mainDevelopment.apply(app);

export default app;
