// import express from 'express'
// const app = express() -------------------------> no need server this time, no need exp
import * as fs from 'fs';  // ------->enough? 😖
// import { writeFileSync } from 'fs'  // ----------->MUST NOT use readFileSync

// import dotenv from "dotenv";
// dotenv.config();
// import Knex from "knex";
// const knexConfigs = require("./knexfile");
// const configMode = process.env.NODE_ENV || "development";
// const knexConfig = knexConfigs[configMode];
// const knex = Knex(knexConfig);
import xlsx from 'xlsx';

async function main() {
    try {
        // xlsx is for reading xlsx and the realted file types ONLY, not .json
        let workBook = xlsx.readFile('./meta_csv_split/test-1-20.csv', { cellDates: true })
        //should not and no need to use xlsx.utils, as there're .json files already
        //also, .json files are perfect as there're no [] and , between object,
        // so can read line by line by 'createReadStream' and thus avoid exhuat RAM.
        const data = xlsx.utils.sheet_to_json(workBook.Sheets['Sheet1'])

        //SHOULD use createReadStream and createWriteStream , 
        // built-in module in node, already add TS versions when user @types/node

    }

    catch (e) {
        return ('error')
    }
}
main() // should use async to enclose it and await main() to execute 

//---------------------------------------- no need server this time
// const PORT = 8080;
// app.listen(PORT, () => {
//     console.log(`[INFO] listening on ${PORT}`);
// });






/*
   {
       SheetNames:[meta_Movies_and_TV],
       Sheets: {
           meta_Movies_and_TV:{ .......}
       }
   }
   */




   //by jason 
//    import xlsx from 'xlsx'

// function main() {
//     const workbook = xlsx.readFile('./meta_csv_split/test-1-20.csv')
//     const sheet = workbook.Sheets['Sheet1'];
//     const data = xlsx.utils.sheet_to_json<any>(sheet)

//     for (const row of data) {
//         console.log(row.category)
//     }
// }

// main()

