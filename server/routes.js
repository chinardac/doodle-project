import {Router} from 'express';

import movieController from './controllers/movieController';

const routes = new Router();

routes.get('/movies', movieController.getMovies);

export default routes;
