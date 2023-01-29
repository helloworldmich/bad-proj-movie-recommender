import express from 'express';
import { knex } from './app';
export const homePageRoutes = express.Router()


// GET
homePageRoutes.get('/', getMovies)
// homePageRoutes.get('/:id', getMovie);

async function getMovies(req: express.Request, res: express.Response) {
    const limit = 12;
    const offset = Number(req.query.index) * limit
    const queryResult = await knex
    .select('description', 'title', 'rank', 'imageURL', 'id', 'also_view', 'asin')
    .from('movies')
    .orderBy('also_view', 'asc')
    .offset(offset)
    .limit(limit);

    const movies = queryResult;
    res.json({ data: movies});
}

// async function getMovie(req: express.Request, res: express.Response) {
//     console.log('getMovies')

//     const movie_id = req.params.id

//     try {

//         const movieTitle = (await knex(/*SQL*/`SELECT * FROM movies WHERE id = $1;`, [movie_id])).rows[2];
//         const description = (await knex.query(/*SQL*/`SELECT * FROM movies WHERE id = $1;`, [movie_id])).rows[1];
        
//         const movieImages = (await client.query(/*SQL*/`SELECT * FROM images WHERE shop_id = $1;`, [movie_id])).rows;
//         const reviews = (await client.query(/*SQL*/`SELECT * FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.movie_id = $1 ORDER BY reviews.id DESC`, [shop_id])).rows;

//         console.log({ movieTitle, description});

//         for (let index = 0; index < reviews.length; index++) {
//             const review = reviews[index];
//             const reviewImages = (await client.query(/*SQL*/`SELECT * FROM review_images WHERE review_id = $1 ORDER BY id DESC`, [review.id])).rows;
//             reviews[index]['images'] = reviewImages
//         }

//         res.json({ movie, movieImages, reviews })
//     } catch (err) {
//         console.error(err)
//         res.json({ result: false })
//     }
// }


// homePageRoutes.get('/movies',async(req,res)=>{
//         const movieList = await client.query(`SELECT * from movies 
//         LEFT JOIN images 
//         ON shops.id = images.shop_id
//         WHERE images.id in (
//             SELECT MIN(id) from images group by shop_id
//         );`)
//         const movieData = movieList.rows
//         res.json(movieData)
//     })

