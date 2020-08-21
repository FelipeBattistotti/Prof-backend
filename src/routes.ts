import express from 'express';
import connection from './database/connection';

//import * as UserController from './controllers/UserController';

const routes = express.Router();

/**
 * GET user
 */
//routes.get('/user', UserController.index);

routes.post('/classes', async (request, response) => {
    const {
        name,
        email,
        pwd,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    await connection('user').insert({
        name,
        email,
        pwd,
        avatar,
        whatsapp,
        bio,
    });

    return response.send();
});

export default routes;
