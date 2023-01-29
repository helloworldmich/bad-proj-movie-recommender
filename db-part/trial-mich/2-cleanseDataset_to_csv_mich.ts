//******************************same content with main.ts but w/ notes  ******************************
//run file command: ts-node main.ts 
import readline from 'readline'
import * as fs from 'fs';  // 
// import { writeFileSync } from 'fs'--->MUST NOT use readFileSync

async function main() {
    try {
        // initialize knex here
        const rl = readline.createInterface({
            // input: fs.createReadStream('./meta_json_split/meta_Movies_and_TV_final.json'),
            // input: fs.createReadStream('./meta_json_split/meta_Movies_and_TV1.0.json'),
            input: fs.createReadStream('./meta_Movies_and_TV.json'),
            // input: process.stdin,
            // output: fs.createWriteStream('output.json'),       
            output: process.stdout,
            terminal: false  // better to user false when truly running the program
            // true --->occupy RAM and slow the speed, though console.log can see what was read
        });
        rl.on('line', (line) => {
            try {
                // fs.createReadStream('input/in.json').pipe(fs.createWriteStream('output/out.json'));   //pipe: rare to use
                const obj = JSON.parse(line)
                delete obj.tech1
                delete obj.fit
                delete obj.tech2
                delete obj.brand
                delete obj.feature
                delete obj.main_cat
                delete obj.similar_item
                delete obj.date
                delete obj.price
                delete obj.details
                delete obj.rank
                //better to write what we hv, not what to delete
                //  const newObj = {
                //         category: newCategory,
                //         description: obj.description
                //     }

                if (obj.category && obj.category.length !== 0) {
                    let arr = obj.category  // = [ 'Movies & TV', 'Genre for Featured Categories', 'Documentary' ]
                    let newCategory = arr.filter((word: string) => !word.includes('Movies & TV') && !word.includes('Genre for Featured Categories'));
                    // newCategory.replaceAll(',', '')  //may need 

                    //works
                    let newDescription = obj.description.join('_').replace(/\s+/g, ' ')
                    // console.log(newDescription)

                    //works
                    for (let titleWord of obj.title) {
                        titleWord = titleWord.replace(',', '')
                    }
                    let newTitle = obj.title.replace(',', '')
                    // console.log(newTitle)


                    //knex.insert(...).into('table')     insert obj             // add knex from here to insert obj into db-------->janet

                    // if (obj.rank && obj.rank.length !== 0) {   // obj.rank.length !== 0 to screen out []
                    //m1 : .substring
                    //m2:replace
                    //     const newRank = obj.rank.replace(' in Movies & TV (', '')
                    //     obj.rank = newRank

                    // for exporting to csv:
                    // ${obj.category.join("_")}

                    const ObjToCsv = `${newCategory}, ${newDescription}, ${newTitle}, ${obj.also_buy.join('_')},  ${obj.also_view.join('_')}, ${obj.asin}, ${obj.imageURL.join('_')}, ${obj.imageURLHighRes.join('_')}`
                    // csv 不應有key, 第一行是heading
                    fs.createWriteStream('./output.csv', { flags: 'a' }).write(ObjToCsv + "\n")
                    // console.log(ObjToCsv)


                    // for writing json file, for inserting knex, no need export json file now
                    // const metaNew = `category:${obj.category.join()}, description: ${obj.description.join()}, title: ${newTitle}, also_buy: ${obj.also_buy.join()},rank: ${obj.rank}, also_view: ${obj.also_view.join()}, asin:${obj.asin}, imageURL: ${obj.imageURL.join()}, imageURLHighRes: ${obj.imageURLHighRes.join()}`
                    // const metaNew = `category:${obj.category.join()}, description: ${newDescription}, title: ${newTitle}, also_buy: ${obj.also_buy.join()},rank: ${obj.rank}, also_view: ${obj.also_view.join()}, asin:${obj.asin}, imageURL: ${obj.imageURL.join()}, imageURLHighRes: ${obj.imageURLHighRes.join()}`
                    // fs.createWriteStream('./output.json', { flags: 'a' }).write(metaNew + "\n")
                    // console.log(metaNew)
                    // }
                } return
            }
            catch (e) {
                console.log(e);
                return
            }
        })
    }
    catch (e) {
        return ('error')
    } return
}
(async function () {
    await main();
})();


// if write into a new json file: 


                    //https://stackoverflow.com/questions/10384340/how-to-append-to-new-line-in-node-js
                    //裡面的.open 不等於這裡的createWriteStream, .open和.wrtie 相當於createWriteStream,因createReadStream不是開file,是開了一個stream去讀file
                    //因此flag應放在createWriteStream,不是createReadStream
                    // fs.createWriteStream('./output.json', { flags: 'a' }).write(JSON.stringify(obj) + "\n")
                    // 需要.write才可以output file因createWriteStream不是寫file,開stream被file寫入
                    // "\n"應放在.write 不是createWriteStream
                    //要有{ flags: 'a' }, a=append,否則所有record在一行內


                    // if (obj.category == 'undefined' || Array.isArray(obj.category) == false || obj.category.length == 0) {
                    // }
                    // else {
                    //     obj.category.shift()  // obj.category=[]
                    //     if (obj.category[0] == 'Genre for Featured Categories') {
                    //         obj.category.shift()
                    //     }
                    //     console.log(obj.category)
                    // }
                    // const filename = '/output' + think.uuid(32) + '.jpg';







//why this one dones't work????????????😖
/* let newDescription = obj.description.join(" ") // string
  newDescription.replaceAll('\n', ' ')
  obj.description = newDescription
console.log(obj.description)
*/




//why this one dones't work????????????😖
/*let newTitle = obj.title.replaceAll(',', '')
obj.title = newTitle
console.log(obj.title)
*/