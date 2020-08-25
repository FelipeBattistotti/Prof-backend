import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';
import Knex from 'knex';

class ConnectionController {

    async index (request: Request, response: Response) {
        
    };

    async create (request: Request, response: Response) {

        const id: string = generateUniqueId();

        const created_at = connection.fn.now();

        const user_id: string = request.body.user_id;

        await connection('connection').insert({
            id,
            created_at,
            user_id,
        });

        return response.status(201).send();
    };
};

export default ConnectionController;
