import knex from 'knex';
import path from 'path';

const db = knex({
    client: 'pg',
    connection: {
        filename: path.resolve(__dirname, '')
    }
});
