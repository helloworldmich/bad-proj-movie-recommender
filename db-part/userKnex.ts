import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

import readline from 'readline'
import * as fs from 'fs';
// import { hashPassword } from '../hash'
const tables = Object.freeze({

    USER: "users",
})

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
async function readUserData() {


    // await trx.raw(`TRUNCATE ${tables.REVIEW} RESTART IDENTITY CASCADE`);
    // await trx.raw(`TRUNCATE ${tables.USER} RESTART IDENTITY CASCADE`);
    // await trx.raw(`TRUNCATE ${tables.MOVIE} RESTART IDENTITY CASCADE`)


    const rl = readline.createInterface({
        input: fs.createReadStream('../data_src/split_review_000.json'),
        output: process.stdout,
        terminal: false
    });

    let insertedUser: any
    const userSet = new Set<string>();

    rl.on('line', async (line) => {
        const trx = await knex.transaction()
        // let userObj = {}    --------->why can't be here?????
        try {
            const obj = JSON.parse(line)
            if (!userSet.has(obj.reviewerID) ) { //&& obj.reviewerName == !null
                // const hPass = await hashPassword('1234')
                let userObj = {}
                userSet.add(obj.reviewerID);
                userObj = { username: obj.reviewerName, password: '1234', reviewerID: obj.reviewerID }  //should use datatype Map, but why&how 
                insertedUser = await trx(tables.USER).insert(userObj)
            }
            // else if (!userSet.has(obj.reviewerID) && obj.reviewerName == null) {
            //     obj.reviewerName == 'anonymous'
            //     let userObj = {}
            //     userSet.add(obj.reviewerID);
            //     userObj = { username: obj.reviewerName, password: '1234', reviewerID: obj.reviewerID }  //should use datatype Map, but why&how 
            //     insertedUser = await trx(tables.USER).insert(userObj)
            // }

            trx.commit()

        }
        catch (e) {
            console.log(e);
            console.log(insertedUser)
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
    await readUserData();
})();

