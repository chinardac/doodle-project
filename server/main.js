import express from 'express';
import { MongoClient } from 'mongodb';

import env from '../environment/environment';
import logger from './middlewares/logger';
import routes from './routes';
import { apply } from './main.development';

const app = express();
const { port } = env.express;

MongoClient.connect(env.getMongoUrl(), (err, database) => {
    if(err) {
        console.log(err);
    }

    app.use((req, res, next) => {
        req.db = database;
        next();
    });

    app.use(logger);
    app.use(routes);

    apply(app);
});

export default app;
