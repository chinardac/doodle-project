import express from 'express';
import { MongoClient } from 'mongodb';

import logger from './middlewares/logger';
import routes from './routes';
import { apply } from './main.development';

const app = express();
const port = 52671;

app.locals = {
  hostname: 'localhost',
  port,
  protocol: 'http:'
};

MongoClient.connect('mongodb://chinar.dac:8800578234@ds021346.mlab.com:21346/doodle', (err, database) => {
    if(err) {
        console.err(err);
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
