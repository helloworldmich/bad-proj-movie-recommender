import express from 'express'
import expressSession from 'express-session'
import pg from 'pg';
import path from "path";
// import { isLoggedIn } from './guards';
import { userRoutes } from './userRoutes'        // userRoutes
import { homePageRoutes } from './homePageRoutes'
import { detailPageRoutes } from './detailPageRoutes'
import { searchRoutes } from './searchRoutes'
import { recommendRoutes } from './recommendRoutes'
import { reviewsPerUserRoutes } from './reviewsPerUserRoutes'  //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
// import fetch from "node-fetch";
import dotenv from 'dotenv';
dotenv.config();
import grant from 'grant';
import Knex from "knex";

const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);


export const tables = Object.freeze({
  USER: "users",
  MOVIE: "movies",
  REVIEW: "reviews",
  RECOMMEND: "recommend",

});

export interface Shop {
  id: number;
  content: string;
  image?: string;
}


const app = express();


const grantExpress = grant.express({
  "defaults": {
    "origin": "http://localhost:8080",
    "transport": "session",
    "state": true,
  },
  "google": {
    "key": process.env.GOOGLE_CLIENT_ID || "",
    "secret": process.env.GOOGLE_CLIENT_SECRET || "",
    "scope": ["profile", "email"],
    "callback": "/login/google"
  }
});

const PORT = 8080;
app.use(expressSession({
  secret: 'how to write the content is up to you',
  resave: true,
  saveUninitialized: true
}));

app.use(grantExpress as express.RequestHandler);

export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();


app.get('/test', (req, res) => {
  res.json({ message: "123" })
})

app.get("/get-username", async (req, res) => {
  console.log('***get username')
  if (req.session['user']) {
    res.json({
      result: true,
      username: req.session['user'].username,
      id: req.session['user'].id,
      reviewerId: req.session['user'].reviewerId
    });
  }
  else { res.json({ result: false }); }
});


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`req.path ${req.path}`)
  next();
})

app.use('/getDetail', detailPageRoutes)
app.use('/searchMovie', searchRoutes)
app.use('/movies', homePageRoutes)
app.use('/recommend', recommendRoutes)
app.use('/reviewsPerUserRoutes', reviewsPerUserRoutes)  //🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
app.use(express.static(path.join(__dirname, "public")));
// app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/', userRoutes);
// app.use(isLoggedIn, express.static(path.join(__dirname, "protected")));

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})
