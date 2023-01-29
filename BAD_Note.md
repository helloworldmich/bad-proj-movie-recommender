# Notes

## I. Init Project

```bash

npm init -y

yarn init -y

```

# <p>&nbsp;</p>

<p>&nbsp;</p>

## II. Install Packages

```bash

# typescript

npm install ts-node typescript @types/node -g

yarn add ts-node typescript @types/node

# express & nodemon

npm install express @types/express nodemon

yarn add express @types/express nodemon

# socket.io

npm install socket.io @types/socket.io

yarn add socket.io @types/socket.io

# knex & pg & dotenv

yarn add knex @types/knex pg @types/pg dotenv @types/dotenv

yarn knex init -x ts

export DB_NAME="emy" &&
echo -e " DB_USERNAME=postgres \n DB_PASSWORD=postgres \n DB_NAME="$DB_NAME" \n" >> .env &&
echo -e " TEST_DB_USERNAME=postgres \n TEST_DB_PASSWORD=postgres \n TEST_DB_NAME="$DB_NAME"_test \n"  >> .env

```

```bash
# all

yarn add ts-node typescript @types/node && yarn add express @types/express nodemon && yarn add socket.io @types/socket.io && yarn add knex @types/knex pg @types/pg && yarn knex init -x ts &&
export DB_NAME="casino" &&
echo -e " DB_USERNAME=postgres \n DB_PASSWORD=postgres \n DB_NAME="$DB_NAME" \n" >> .env &&
echo -e " TEST_DB_USERNAME=postgres \n TEST_DB_PASSWORD=postgres \n TEST_DB_NAME="$DB_NAME"_test \n"  >> .env

```

# <p>&nbsp;</p>

<p>&nbsp;</p>

## III. DB - (1) knexfile.ts

https://gist.github.com/laurenfazah/e0b0033cdc40a313d4710cc04e654556

https://devhints.io/knex

```typescript
// knexfile.ts

/*
.env

 DB_USERNAME=postgres 
 DB_PASSWORD=postgres 
 DB_NAME=

 TEST_DB_USERNAME=postgres 
 TEST_DB_PASSWORD=postgres 
 TEST_DB_NAME=

*/

import dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    debug: true,
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  test: {
    client: "postgresql",
    connection: {
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
```

## III. DB - (2) knex migrations

```bash
[shell]

yarn knex migrate:make init

```
```typescript

import  Knex from "knex";

exports.up =async function (knex: Knex) {
    const hasTable = await knex.schema.hasTable('users');
    if(!hasTable){
        return await knex.schema.createTable('users',(table)=>{
                table.increments();
                table.string('username');
                table.string('password');
                table.timestamps(false,true);
        });
    }else{
        return Promise.resolve();
    }
};

exports.down = function (knex: Knex) {
    return knex.schema.dropTable('users')
};

```
```bash
[shell]

yarn knex migrate:latest  
```

## III. DB - (3) knex seed

```bash
yarn knex seed:make init
```
```typescript
import  Knex from "knex";

exports.seed = async function (knex: Knex) {
    await knex('users').del();

    const users = [
        {
            username:"tecky",
            password:"$2b$10$wekgcZqAExMyWT8ycA.81ef3EKaOsz.DBwb0KGhI6J/3aUpDSePqO"
        }
    ]
    return await knex.insert(users).into('users').returning('id');
};

```
```bash
yarn knex seed:run
```


## III. DB - (4) Postgres SQL

### Useful Commands

Most \d commands support additional param of **schema**.name\_\_ and accept wildcards like _._

```
\?: Show help (list of available commands with an explanation)
\q: Quit/Exit
\c **database**: Connect to a database
\d **table**: Show table definition (columns, etc.) including triggers
\d+ **table**: More detailed table definition including description and physical disk size
\l: List databases

\dy: List events
\df: List functions
\di: List indexes
\dn: List schemas
\dt _._: List tables from all schemas (if _._ is omitted will only show SEARCH_PATH ones)
\dT+: List all data types
\dv: List views
\dx: List all extensions installed
\df+ **function** : Show function SQL code.
\x: Pretty-format query results instead of the not-so-useful ASCII tables
\copy (SELECT \* FROM **table_name**) TO 'file_path_and_name.csv' WITH CSV: Export a table as CSV
\des+: List all foreign servers
\dE[S+]: List all foreign tables
\! **bash_command**: execute **bash_command** (e.g. \! ls)
User Related:

\du: List users
\du **username**: List a username if present.
create role **test1**: Create a role with an existing username.
create role **test2** noinherit login password **passsword**;: Create a role with username and password.
set role **test**;: Change role for current session to **test**.
grant **test2** to **test1**;: Allow **test1** to set its role as **test2**.
\deu+: List all user mapping on server
```

```sql

--------------------------
-- CREATE DATABASE & TABLE
--------------------------

CREATE DATABASE "memo-wall";

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password varchar(255)
);

create TABLE memos(
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    image text
    -- is_deleted bool
);

--------------
-- Insert Data
--------------

-- hashed password = 1234
insert into users (username,password) values
('gordon@tecky.io','$2a$10$NUW1cz/1QqzdoLndor8ZU.n6oinIjMURwTJ2BnHVD48JHvSMlJ/Za'),
('alex@tecky.io','$2a$10$NUW1cz/1QqzdoLndor8ZU.n6oinIjMURwTJ2BnHVD48JHvSMlJ/Za'),
('jason@tecky.io','$2a$10$NUW1cz/1QqzdoLndor8ZU.n6oinIjMURwTJ2BnHVD48JHvSMlJ/Za'),
('leo@tecky.io','$2a$10$NUW1cz/1QqzdoLndor8ZU.n6oinIjMURwTJ2BnHVD48JHvSMlJ/Za')
;

insert into memos (content) values
('Use headlines, bullets, and lists to organize the memo and the proposal.'),
('When your boss asks you to find a memo you wrote a year ago, it''s hard to remember what you named it.'),
('Officials often warn tourists not to enter the water, but several tourists searching for that perfect Instagram photo apparently did not get the memo.'),
('The calendar may say only five more days until fall, but mother nature did not get the memo. It is going to be hot and feel even hotter over the next couple of days.'),
('You''re not still wearing those acid-washed jeans, are you? Tube socks and shorts? … OK, so no one told you. You didn''t get the memo. Those things went out with neckties the size of small landing strips.'),
('It was expected to be a five-set test of endurance … But, Edberg apparently did not get the memo because he just dominated Courier and captured his first- ever U.S. Open title with a straight set triumph at the National Tennis Center in New York.'),
('The memo outlines Biden''s push to make Affordable Care Act enhanced subsidies, also known as premium tax credits, permanent.'),
('Monson sent the resignation letter and memo to the four co-chairs of the Joint Conduct Committee, which oversees the office.')
;

-----------------------
-- List items in Tables
-----------------------

select * from users;
select * from memos;

```

# <p>&nbsp;</p>

<p>&nbsp;</p>

## package.json

```json

"main": "dist/index.js",
"scripts": {
  "build": "tsc",
  "start": "tsc & node .",
  "dev": "tsc -w & nodemon .",
}

```

## tsconfig.json

```json

```

## Express

```bash
npm install ts-node-dev
```

```json
'scripts':{
    "start": "ts-node main.ts",
    "dev": "ts-node-dev main.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

```typescript
import express from "express";
const app = express();
const port = 5000;
app.get("/", (req, res) => {
  res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
```

## Socket.io on Express

### Server

```typescript
import express from "express";
import http from "http";
import { Server as SocketIO } from "socket.io";

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

io.on("connection", (socket) => {
  console.log(socket);
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});

app.post("/io.emit", (req, res) => {
  // logic of adding apple.

  "emit-test", "io.emit::testing";
  res.json({ updated: 1 });
});
```

### Client

Web browser

```html
<script src="/socket.io/socket.io.js"></script>
```

Node

```bash

yarn add socket.io-client

```

```javascript
// ES6 import or TypeScript
import { io } from "socket.io-client";
// CommonJS
const io = require("socket.io-client");
```

```javascript

/**
 * From the same domain
 */
const socket = io();

/**
 *
 * /
const socket = io("https://server-domain.com");

// the following forms are similar
const socket = io("https://server-domain.com");
const socket = io("wss://server-domain.com");
const socket = io("server-domain.com"); // only in the browser when the page is served over https (will not work in Node.js)

// same origin version
const socket = io("/admin");

// cross origin version
const socket = io("https://server-domain.com/admin");


```

## NPM jest

```bash
yarn add --dev typescript ts-jest @types/jest @types/node ts-node ts-node-dev
```


## NPM nodemon

- Installation

```bash
npm install -g nodemon
```

- Usage
```bash
nodemon ./server.js localhost 8080
```