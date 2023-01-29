import { Request, Response, NextFunction } from 'express';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (req.session['user']) {
        console.log('suc2')
        next();
    } else {
        console.log('fail to pass isLoggedIn')
        res.redirect('/userLogin.html')
    }
}
