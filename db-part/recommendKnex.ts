import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

// import readline from "readline";
const path = require("path");
const fs = require("fs");

const tables = Object.freeze({
  RECOMMEND: "recommend",
});
// set file directory here
const directoryPath="../data_src/eachjson";

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

async function recommendKnex(file: string) {
  fs.readFile(path.join(directoryPath, file), 'utf8', async (err: any, data: any) => {
    if (err) {
      console.error(err)
      return
    }
    data = JSON.parse(data)
    const trx = await knex.transaction();
    try {
      data.forEach(async (element: any) => {
        let metaData = {
          asin: element.asin,
          title: element.title,
          prediction: element.prediction,
          reviewerID: element.reviewerID,
        };
        const recommend_id = (await trx(tables.RECOMMEND).insert(metaData).returning('recommend_id'))[0];
        console.log(recommend_id)
        trx.commit();
      });
    } catch (e) {
      await trx.rollback();
      console.log(e);
    }
  })
}

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err: any, files: string[]) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function (file) {
    // Do whatever you want to do with the file
    // console.log(file);
    recommendKnex(file);
  });
});
