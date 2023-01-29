import express from 'express';
import { knex } from './app';
export const detailPageRoutes = express.Router()


// GET
detailPageRoutes.get('/:id', getDetail)

async function getDetail(req: express.Request, res: express.Response) {
    console.log(req.params.id)
    const movieId = req.params.id

    const queryResult = await knex
        .select('description', 'title', 'rank', 'imageURL', 'reviewerName', 'reviewText', 'vote', 'reviewerID')
        .from('movies')
        .leftJoin('reviews', 'reviews.asin', 'movies.asin')
        .where('movies.id', '=', movieId);

    const details = queryResult;
    res.json({ data: details });
}
