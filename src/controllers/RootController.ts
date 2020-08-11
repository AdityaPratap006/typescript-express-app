import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }

    res.status(403);
    res.send('Not Permitted!');
}

@controller('')
class RootController {

    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
                <div>
                    <div>You are logged in!</div>
                    <a href="/auth/logout">LOGOUT</a>
                </div>
            `);
        } else {
            res.send(`
                <div>
                    <div>You are not logged in.</div>
                    <a href="/auth/login">LOGIN</a>
                </div>
            `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send("Welcome to protected route, logged in user!")
    }
}