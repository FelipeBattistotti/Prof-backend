import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('connection', function (table) {
        table.string('id').primary();
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('connection');
}
