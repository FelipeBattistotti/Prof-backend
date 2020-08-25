import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionController = new ConnectionController();

/**
 * GET classes
 */
routes.get('/classes', classesController.index);

/**
 * CREATE classes
 */
routes.post('/classes', classesController.create);

/**
 * GET connection
 */
routes.get('/connection', connectionController.index);

/**
 * CREATE connection
 */
routes.post('/connection', connectionController.create);

export default routes;
