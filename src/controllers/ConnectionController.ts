import { Request, Response } from 'express';

import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';
import sendEmail from './../utils/sendEmail';

class ConnectionController {

    async index (request: Request, response: Response) {
        const totalConnections = await connection('connection').count('* as total');

        const { total } = totalConnections[0];

        sendEmail('O sistema foi acessado.');

        return response.json({ total });
    };

    async create (request: Request, response: Response) {

        const id: string = generateUniqueId();

        const created_at = connection.fn.now();

        const user_id: string = request.body.user_id;

        const user = await connection('user')
                .where('user.id', user_id)
                .select('*')
                .first();

        if (user === undefined) {
            return response.status(401).json({ error: 'Usuário não encontrado!' });
        }

        await connection('connection').insert({
            id,
            created_at,
            user_id,
        });

        return response.status(201).send();
    };
};

export default ConnectionController;
