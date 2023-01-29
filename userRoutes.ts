import express from 'express';
// import { checkPassword } from './hash';
import { client } from './app';
import { knex } from './app';
import fetch from 'node-fetch';
export const userRoutes = express.Router();
userRoutes.post('/login', login);
userRoutes.get('/login/google', loginGoogle);
userRoutes.get('/logout', logout);

async function login(req: express.Request, res: express.Response) {
    const { username, password } = req.body;
    const users = await knex
        .select('user_id', 'username', 'password', 'reviewerID')
        .from('users').where('username', username).where('password', password);

    const user = users[0];
    console.log('user', user)
    if (!user) {
        return res.status(401).json({ message: "Invalid username" })
    } else {
        if (req.session) {
            req.session['user'] = {
                id: user.user_id,
                username: user.username,
                reviewerId: user.reviewerID,
            };
        }
        console.log('logged in: ', req.session['user'])
        return res.status(200).json('successfully logged in')
    }
    // // const match = await checkPassword(password, user.password);
    // //const match = password == user.password;
    // // console.log(password, user.password)
    // // console.log(match)

    // // if (match) {
    //     // console.log('suc1')
    //     if (req.session) {
    //         req.session['user'] = {
    //             id: user.id, username: username
    //         };
    //     }
    //     return res.status(200).json('successfully logged in')
    // // } else {
    //     return res.status(401).json({ message: "Invalid password" })
    // // }
}

// async function login(req: express.Request, res: express.Response) {
//     const { username, password } = req.body;
//     const users = await knex
//         .select('username','password')
//         .from('users').where('username', username);

//     const user = users[0];
//     // console.log(user)
//     if (!user) {
//         return res.status(401).json({ message: "Invalid username" })
//     }
//     const match = await checkPassword(password, user.password);
//     //const match = password == user.password;
//     // console.log(password, user.password)
//     console.log(match)

//     if (match) {
//         console.log('suc1')
//         if (req.session) {
//             req.session['user'] = {
//                 id: user.id, username: username
//             };
//         }
//         return res.status(200).json('successfully logged in')
//     } else {
//         return res.status(401).json({ message: "Invalid password" })
//     }
// }

async function logout(req: express.Request, res: express.Response) {
    if (req.session) {
        delete req.session['user'];
        return res.status(200).json({ message: "successfully logged out" });
    }
    return res.status(401).json({ message: "no session found" })

}


//login google
async function loginGoogle(req: express.Request, res: express.Response) {
    console.log('trying to login with google...')
    console.log(req)
    const accessToken = req.session?.['grant'].response.access_token;
    const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: "get",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
    const result = (await fetchRes.json()) as any;
    const users = (await client.query(`SELECT * FROM users WHERE users.username = $1`, [result.email])).rows;
    const user = users[0];
    if (!user) {
        return res.status(401).json({ message: "Invalid username" })
    }
    if (req.session) {
        req.session['user'] = {
            id: user.user_id,
            username: user.username,
            reviewerId: user.reviewerID,
        };
    }
    return res.redirect("/index.html") // To the protected page.
}



