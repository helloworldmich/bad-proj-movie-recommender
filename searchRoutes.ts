import express from 'express';
import { knex } from './app';

export const searchRoutes = express.Router()

searchRoutes.get('/:movieName', searchMovie);

async function searchMovie(req: express.Request, res: express.Response) {
    console.log(req.params.movieName)
    const movieName = req.params.movieName
     
    const queryResult = await knex
    .select('id')
    .from('movies')
    .where('movies.title', '=', movieName);

    const movieResults = queryResult;

    if(movieResults.length==0){
        res.json({url: "/index.html"})
        return
    }else{
        res.json({url: `/detailPage.html?movieId=${movieResults[0].id}`})
        return
    }
}
