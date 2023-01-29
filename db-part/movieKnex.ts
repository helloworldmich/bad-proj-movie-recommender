//formerly: main.ts 
import Knex from "knex";
import dotenv from "dotenv";
dotenv.config();

import readline from 'readline'
import * as fs from 'fs';  // 

const tables = Object.freeze({
    MOVIE: "movies",
})

const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

async function movieKnex() {

    // initialize knex 
    const rl = readline.createInterface({
        input: fs.createReadStream('../data_src/meta_Movies_and_TV.json'),
        output: process.stdout,
        terminal: false
    });
    let result: any
    rl.on('line', async (line) => {
        const trx = await knex.transaction()
        try {
            const obj = JSON.parse(line)
            // delete obj.tech1
            // delete obj.fit
            // delete obj.tech2
            // delete obj.brand
            // delete obj.feature
            // delete obj.main_cat
            // delete obj.similar_item
            // delete obj.date
            // delete obj.price

            // delete obj.rank

            if (obj.category && obj.category.length !== 0) {

                let arr: string[] = obj.category  // = [ 'Movies & TV', 'Genre for Featured Categories', 'Documentary' ]
                let newCategory = (arr.filter((word) => !word.includes('Movies & TV') && !word.includes('Genre for Featured Categories'))).join(",");

                let metaData = {
                    category: newCategory,
                    description: obj.description,
                    title: obj.title,

                    also_buy: obj.also_buy,
                    also_view: obj.also_view,
                    asin: obj.asin,
                    imageURL: obj.imageURL,
                    imageURLHighRes: obj.imageURLHighRes
                }
                // should insert {  } // [{},{},] when using .insert
                await trx(tables.MOVIE).insert(metaData)   //no need .returning('id')
                // console.log("inserted 1 record")


                // newCategory.replaceAll(',', '')  //may need 

                // let newDescription = obj.description.join('_').replace(/\s+/g, ' ')

                // for (let titleWord of obj.title) {
                //     titleWord = titleWord.replace(',', '')
                // }
                // let newTitle = obj.title.replace(',', '')

                // below: a string, only suitable for exporting to csv🌟
                // const metaDataString = `${newCategory}, ${newDescription}, ${newTitle}, ${obj.also_buy.join('_')},  ${obj.also_view.join('_')}, ${obj.asin}, ${obj.imageURL.join('_')}, ${obj.imageURLHighRes.join('_')}`
                // fs.createWriteStream('./output.csv', { flags: 'a' }).write(metaDataString + "\n")
            }
            trx.commit()  //should not await 
        }
        catch (e) {
            trx.rollback()  // should not await 
            console.log(e);
            console.log(result)
        }

        //await knex.destroy()  
    })
}

(async function () {
    await movieKnex();
})();



