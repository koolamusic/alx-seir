import cors from 'cors';
import MongoStore from 'connect-mongo'
import express, { NextFunction, Response, Request } from 'express';
import session from 'express-session';
import { nanoid } from 'nanoid'
import passport from 'passport'
import messengerRoute from './controllers/messenger/routes';
import secrets from './core/secrets';
import * as strategy from './core/auth'
import HttpError from './core/errors';

const server = express();

/* Enable cors:: should limit origin once stabls */
server.use(
  cors({
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    origin: '*',
  })
);

/* MongoStore Session Options */
const mongoStore = MongoStore.create({
  mongoUrl: secrets.MONGO_URI_DEV
})


/* configure session middleware */
const sessionMiddleware = session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.session)
    return nanoid()
  },
  store: mongoStore,
  name: "__jedi.sid__",
  cookie: {
    httpOnly: true,
    signed: true,
    maxAge: 60000,
    // domain: '*.alxseri.xyz, localhost'
  },
  secret: 'w8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: false,
  // rolling: true,
})

/* Sessions and authentication Middleware */
passport.use(strategy.localStrategy)
server.use(sessionMiddleware)
server.use(passport.initialize())
server.use(passport.session())

/* --- JSON Parser for incoming requests --- */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* For the UI and API Routes */
server.use('/messenger',
  // passport.authenticate('local', { failureRedirect: '/_healthcheck' }), // Temp test for passport
  messengerRoute);

server.use('/_healthcheck', (_req: Request, res) => {
  console.log(_req.session, _req.isAuthenticated(), _req.user)
  res.status(200).json({ uptime: process.uptime() });
});

/* Global Error Handler to throw Errors into API Response */
server.use("*", (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status).json({
    status: error.status,
    name: error.name,
    reason: error.message,
    details: error.stack
  });
});


// server.login(user, function(err) {
//   if (err) { return next(err); }
//   return res.redirect('/users/' + req.user.username);
// });

/* Logout Route */
server.use('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ success: true, message: 'logout successful' })
});


export default server;