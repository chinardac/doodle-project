import {Router} from 'express';

import movieController from './controllers/movieController';

const routes = new Router();

routes.get('/api/movies', movieController.getMovies);

export default routes;
