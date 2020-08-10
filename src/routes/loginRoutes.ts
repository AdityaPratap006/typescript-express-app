import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <button>SUBMIT</button>
        </form>
    `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;


    if (email && password && email === 'hi@hi.com' && password === '123') {
        // mark this person as logged in
        req.session = {
            loggedIn: true,
        }

        res.redirect('/');
        // redirect them to the root route
    } else {
        res.status(422).send('Invalid email or password');
    }
});

router.get('/', (req: RequestWithBody, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
                <div>You are logged in!</div>
                <a href="/logout">LOGOUT</a>
            </div>
        `);
    } else {
        res.send(`
            <div>
                <div>You are not logged in.</div>
                <a href="/login">LOGIN</a>
            </div>
        `);
    }
});

export { router };