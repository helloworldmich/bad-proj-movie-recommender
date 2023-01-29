import { Knex } from "knex";
const tables = Object.freeze({
    REVIEW: "reviews",
    RECOMMEND: "recommend",
    USER:'users'
});

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tables.RECOMMEND, (t) => {
        t.increments("recommend_id");
        t.string("asin").notNullable();
        t.string('title').nullable()
        t.string('prediction').notNullable()
        t.string("reviewerID").notNullable()
        t.foreign('reviewerID').references(`${tables.USER}.reviewerID`)

        // t.timestamps(false, true);
    });

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tables.RECOMMEND);

}