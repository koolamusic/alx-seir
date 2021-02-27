import cors from 'cors';
import MongoStore from 'connect-mongo'
import express, { NextFunction, Response, Request } from 'express';
import session from 'express-session';
import passport from 'passport'
import secrets from './core/secrets';
import HttpError from './core/errors';
import logger from './core/logger'

/* API ROUTES */
import messengerRoute from './controllers/messenger/routes';
import authRoute from './controllers/auth/routes'


const server = express();

/* Enable cors:: should limit origin once stable */
server.use(
  cors({
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    origin: ['*', '*.alxseri.xyz'],
  })
);

/* MongoStore Session Options */
const mongoStore = MongoStore.create({
  mongoUrl: secrets.MONGO_URI_DEV
})



/* configure session middleware */
const sessionMiddleware = session({
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
server.use(`/${secrets.VERSION}/messenger`, messengerRoute);
server.use(`/${secrets.VERSION}/auth`, authRoute);


// const userInfo = {
//   name: "Amaloar",
//   email: 'rubik@mail.com',
//   username: 'rubik@mail.com',
//   password: "123456"
// }

server.post('/login', (req, res, next) => {
  console.log("In login route", req.user, req.body)


  passport.authenticate('local', (_err, user, info) => {
    console.log("IN PASSPORT AUTHENTICATE", info)

    try {

      if (!user) {
        console.log("I got here for info", info)
        throw new HttpError(422)
      }

      req.login(user, function (err) {
        console.log("I got here to logins")
        if (err) {
          logger.error(err)
          throw new HttpError(401, err)

        }

        return res.redirect('/_healthcheck');
      });
    } catch (err) {
      res.json(err)
    }

  })
    (req, res, next);



});


server.use('/_healthcheck', (_req: Request, res) => {
  console.log(_req.session, _req.isAuthenticated(), _req.sessionID)
  res.status(200).json({ uptime: process.uptime() });
});


/* Logout Route */
server.use('/logout', (req, res) => {
  req.logout();
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