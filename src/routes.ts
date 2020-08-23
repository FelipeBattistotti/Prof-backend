import express from 'express';
import ClassesController from './controllers/ClassesController';

const routes = express.Router();
const classesController = new ClassesController();

/**
 * GET classes
 */
routes.get('/classes', classesController.index);

/**
 * CREATE classes
 */
routes.post('/classes', classesController.create);

export default routes;
