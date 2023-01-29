import express from 'express';
import { knex } from './app';
export const recommendRoutes = express.Router();

recommendRoutes.get('/:id', getRecommend);

async function getRecommend(req: express.Request, res: express.Response) {
    console.log('getRecommend')
    const reviewerID = req.params.id
//try
    const queryResult = await knex
    .select('movies.id','description', 'recommend.title', 'imageURL')
    .from('recommend')
    .leftJoin('movies', 'recommend.asin', 'movies.asin')
    .where("recommend.reviewerID", '=', reviewerID)
    .orderBy('recommend.prediction', 'desc')
    .limit(4)

    const recommendedMovies = queryResult;
    res.json({ data: recommendedMovies});

}