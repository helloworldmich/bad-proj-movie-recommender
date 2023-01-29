import { Knex } from "knex";
// const reviewTable = 'reviews'

export const tables = Object.freeze({
    REVIEW: "reviews",
});

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tables.REVIEW, (table) => {
        table.increments();
        table.integer("overall")
        table.boolean('verified')
        table.date("reviewTime")
        table.string("reviewerID");
        table.string('asin')
        table.string('reviewerName')
        table.text('reviewText')
        table.string('summary')
        table.integer('vote')
        // table.timestamps(false, true);
    });

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tables.REVIEW);

}
