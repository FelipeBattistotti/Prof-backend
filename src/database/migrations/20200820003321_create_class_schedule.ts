import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('class_schedule', function (table) {
        table.string('id').primary();
        table.integer('week_day').notNullable();
        table.string('from').notNullable();
        table.string('to').notNullable();

        table.string('class_id').notNullable();
        table.foreign('class_id').references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('class_schedule');
}
