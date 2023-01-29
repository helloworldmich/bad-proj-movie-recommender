//formerly: main.ts 
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

import readline from 'readline'
import * as fs from 'fs';

const tables = Object.freeze({
    REVIEW: "reviews",   // why need ""😖
    // USER: "users",
    // MOVIE: "movies",

})

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
async function readReviewData() {

    // initialize knex here    
    // await trx.raw(`TRUNCATE ${tables.REVIEW} RESTART IDENTITY CASCADE`);
    // await trx.raw(`TRUNCATE ${tables.USER} RESTART IDENTITY CASCADE`);
    // await trx.raw(`TRUNCATE ${tables.MOVIE} RESTART IDENTITY CASCADE`)


    const rl = readline.createInterface({
        input: fs.createReadStream('../data_src/split_review_000.json'),
        output: process.stdout,
        terminal: false
    });

    let result: any

    rl.on('line', async (line) => { //callback fn can't throw the error to try-catch , try-catch must inside cb fn
        const trx = await knex.transaction()
        try {                             // why need 2 layers of try catch
            const obj = JSON.parse(line)
            // delete obj.style
            // delete obj.unixReviewTime
            // delete obj.image
            let objReview = { 'overall': obj.overall, 'verified': obj.verified, 'reviewTime': obj.reviewTime, 'reviewerID': obj.reviewerID, 'asin': obj.asin, 'reviewerName': obj.reviewerName, 'reviewText': obj.reviewText, 'summary': obj.summary, 'vote': obj.vote }
            // console.log(objReview)

            // type InsertedReviews ={   }

            result = await trx(tables.REVIEW).insert(objReview)   //.returning('id')
            // console.log(result)  // result = id 

            trx.commit()

        }
        catch (e) {
            console.log(e);
            console.log(result)
            // trx.rollback();
            // process.exit(1);
        }
    });

    // rl.on('close', () => {
    //     //trx.commit()
    //     process.exit(1);
    // })
}
(async function () {
    await readReviewData();
})();

