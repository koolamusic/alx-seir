import cors from 'cors';
import MongoStore from 'connect-mongo'
import express, { NextFunction, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport'
import secrets from './core/secrets';
import HttpError from './core/errors';
import { authHandler } from './core/auth'

/* API ROUTES */
import messengerRoute from './controllers/messenger/routes';
import authRoute from './controllers/auth/routes'


const server = express();

/* Enable cors:: should limit origin once stable */
server.use(
  cors({
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
    origin: secrets.IS_PROD ? secrets.FRONTEND_ONE : "http://localhost:3000",
  })
);

/* MongoStore Session Options */
const mongoStore = MongoStore.create({
  mongoUrl: secrets.MONGO_URI_DEV
})



/* configure session middleware */
const sessionMiddleware = session({
  store: mongoStore,
  name: "__app.sid",
  cookie: {
    httpOnly: true,
    secure: 'auto',
    signed: true,
    sameSite: 'lax',
    maxAge: 86400000, // 24hours
    domain: secrets.IS_PROD ? secrets.COOKIES_DOMAIN : 'localhost'
  },
  proxy: true,
  secret: secrets.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  rolling: true,
})

/* Sessions and authentication Middleware */
server.use(sessionMiddleware)
server.use(passport.initialize())
server.use(passport.session())

/* --- JSON Parser for incoming requests --- */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* For the UI and API Routes */
server.use(`/${secrets.VERSION}/outbox`, messengerRoute);
server.use(`/${secrets.VERSION}/auth`, authRoute);


server.post('/login', (req, res, next) => authHandler(passport)(req, res, next))


server.use('/_healthcheck', (_req: Request, res) => {
  console.log(_req.session, _req.isAuthenticated(), _req.sessionID)
  res.status(200).json({ uptime: process.uptime() });
});


/* Logout Route */
server.post('/logout', (req, res) => {
  req.logout();
  // res.redirect('/_healthcheck')
  res.status(200).json({ success: true, message: 'logout successful' })
});


/* Global Error Handler to throw Errors into API Response */
server.use("*", (error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.status).json({
    status: error.status,
    name: error.name,
    reason: error.message,
    // details: error.stack
  });
});



export default server;