import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 50,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "process.env.DB_NAME",
      user: "process.env.DB_USERNAME",
      password: "process.env.DB_PASSWORD",
    },
    pool: {
      min: 2,
      max: 50,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "process.env.DB_NAME",
      user: "process.env.DB_USERNAME",
      password: "process.env.DB_PASSWORD",
    },
    pool: {
      min: 2,
      max: 50,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};