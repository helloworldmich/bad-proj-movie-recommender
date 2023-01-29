import { Knex } from "knex";
const tables = Object.freeze({
    USER: "users",
})



export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tables.USER, (t) => {
        t.increments("user_id");
        t.string("reviewerID").notNullable().unique();
        t.string("username").notNullable();
        t.string("password").notNullable();
        t.timestamps(false, true);
    });

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tables.USER);
}

