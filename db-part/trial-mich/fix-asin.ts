import * as fs from 'fs';
import readline from 'readline'
async function addZero() {


    const rl = readline.createInterface({
        input: fs.createReadStream('./Movies_and_TV.json'),
        output: process.stdout,
        terminal: false
    });
    rl.on('line',  (line) => {
        try {

            const obj = JSON.parse(line)
            const reviewNew = `category:${obj.category}, description: ${obj.description}, title: ${obj.title}, also_buy: ${obj.also_buy},rank: ${obj.rank}, also_view: ${obj.also_view.join()}, asin:${obj.asin}, imageURL: ${obj.imageURL.join()}, imageURLHighRes: ${obj.imageURLHighRes.join()}`
            fs.createWriteStream('./output.json', { flags: 'a' }).write(reviewNew + "\n")

            




        }
        catch (e) {
            console.log(e);
            return
        }

    })
}



(async function () {
    await addZero();
})();