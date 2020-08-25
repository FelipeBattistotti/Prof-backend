import { Request, Response } from 'express';

import connection from '../database/connection';

class ConnectionController {

    async index (request: Request, response: Response) {
        
    };

    async create (request: Request, response: Response) {
        const { user_id } = request.body;

        await connection('connection').insert({
            user_id,
        });

        return response.status(201).send();
    };
};

export default ConnectionController;
