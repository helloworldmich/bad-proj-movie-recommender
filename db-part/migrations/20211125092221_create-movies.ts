import { Knex } from 'knex';

const tables = Object.freeze({
MOVIE: 'movies',
});

export async function up(knex: Knex): Promise<void> {
await knex.schema.createTable(tables.MOVIE, (table)=>{
table.increments();
table.text('category')
table.text('description')
table.text('title')
table.text('also_buy')
table.text('rank')
table.text('also_view')
table.text('asin')
table.text('imageURL')
table.text('imageURLHighRes')
})
}

export async function down(knex: Knex): Promise<void> {
knex.schema.dropTable(tables.MOVIE);
}