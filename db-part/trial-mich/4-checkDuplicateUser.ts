import { AsyncLocalStorage } from "async_hooks";
// m1 should use datatype Set (coz onyl store unique values)
// no need m2, coz each line already has corresponding  reviewerName


const userSet = new Set<string>();

for (let line of lines) {
  const obj = line;
  if (!userSet.has(obj.name)) {
    console.log("update userMap");
    userSet.add(obj.name);
    console.log({ name: obj.name, id: obj.id });
  } else {
    console.log("found duplicate");
  }
}

console.log(userSet);


// m2: datatype Map (not fn .map) 

const userMap: Record<string, number> = {};   //<<<<<<<-----hv to put in global scrope,
//otherwise, this map would reset every time
// as this fn, async (line)=>{} , will be trigger every new line read
// so Map will be empty after every line read,
//can't store 
rl.on('line', async (line) => {
  const trx = await knex.transaction()


  try {
    const obj = JSON.parse(line)
    if (!(obj.reviewerID in userMap)) {

      userMap['username'] = obj.reviewerName;
      userMap['reviewerID'] = obj.reviewerID
      // userMap['password'] = '1234' -->set the type Record<string, number> <key, value>
      // so key shoud be number, can't as string
      // also, storing 3 items in a Map violates the Map datatype too 
    }
    // let userMap = { 'username': username, 'password': '1234', 'reviewerID': obj.reviewerID }
    insertedUser = await trx(tables.USER).insert(userMap)
    trx.commit()

  }
  catch (e) {
    console.log(e);
    console.log(insertedUser)
    // trx.rollback();
    // process.exit(1);
  }
});



// simlar eg by jason : 
const userMap: Record<string, number> = {};

for (let line of lines) {   // similar to each line i read
  const obj = line;
  if (!(obj.name in userMap)) {
    console.log("update userMap");
    userMap[obj.name] = obj.id;
  } else {
    console.log("found duplicate");
  }
} ```
    
    console.log(userMap);