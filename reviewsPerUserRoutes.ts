import express from 'express';
import { knex } from './app';
export const reviewsPerUserRoutes = express.Router()
import { isLoggedIn } from './guards'

// GET
reviewsPerUserRoutes.get('/', isLoggedIn, getReviewPerUser)

async function getReviewPerUser(req: express.Request, res: express.Response) {
    const reviewerID = req.session['user']?.reviewerId             //<<<<<<<<<<<<😖😖😖😖😖😖😖😖😖😖
    console.log(`reviewerID : ${reviewerID}`)

    const queryResult = await knex
        // .select('description', 'title', 'rank', 'imageURL', 'reviewerName', 'reviewText', 'vote', 'reviewerID')
        .select('reviews.*', 'users.username', 'movies.title')
        .from('reviews')
        .innerJoin('users', 'reviews.reviewerID', 'users.reviewerID')
        .rightJoin('movies', 'movies.asin', 'reviews.asin')
        .where('users.reviewerID', reviewerID)//<<<<<<<<<<<<😖😖😖😖😖😖😖😖😖😖
    res.json({ data: queryResult }); // data:{}

    // const queryResult2 = await knex.select('*').from('reviews').innerJoin('movies', 'reviews.asin', 'movies.asin')
    // const eachReviewEachUser = queryResult;  //{}
    // const titleAndReviews = queryResult2;  //{}
    // res.json({ data: eachReviewEachUser, titleAndReviews }); // data:{}

}

// const reviewerID = req.params.id
    // const queryResult = await knex
    //     .select('reviewerID')
    //     .from('users')
    //     .leftJoin('reviews', 'reviews.asin', 'movies.asin')
    //     .where('reviewerID', '=', reviewerID)
    //     .orderBy('reviews.reviewText', 'desc')
    // const reviewsHistory = queryResult;
    // res.json({ data: reviewsHistory });