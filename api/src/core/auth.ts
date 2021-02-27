/**
 * We want to validate the user information to configure this local strategy
 * 1. Define Validation Logic for Local Strategy
 * 2. Add Serializer for Authentication
 * 3. Add Deserializer for Sessions and protected routes
 */
import { Request, Response, NextFunction } from 'express'
import { Authenticator } from 'passport';
import { Strategy, VerifyFunction, IStrategyOptions } from 'passport-local'
import { LoginUserInputDTO } from '../shared/user.interface';
import AuthApplication from './../application/auth';
import HttpError from './errors'


/* Passport local strategy options */
const strategyOptions: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true
}

// const mockPayload = {
//     name: "Amaloar",
//     email: 'rubik@mail.com',
//     username: 'rubik@mail.com',
//     password: "123456"
// }

const verifyUser: VerifyFunction = async (username, password, done) => {
    try {
        if (username && password) {
            const user = await AuthApplication.getCurrentUser({ email: username })
            if (!user) {
                throw new HttpError(401);
            }
            return done(null, user)
        }
    } catch (error) {
        done(error)
    }

}

export const localStrategy = new Strategy(strategyOptions, verifyUser)


/* Middleware to check if user is authenticated in routes */
export const isAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
    try {
        console.log("is authenticated is =", req.isAuthenticated(), req.isUnauthenticated())
        if (!req.isAuthenticated()) {
            throw new HttpError(401, "You are not authenticated")
        }
        next()
    } catch (error) {
        next(error)
    }
}


/* Tell passport how to serialize the user */
export const userSerializer = async (user: Express.User, done: (err: null, tid: Express.User) => void) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here', user)
    done(null, user);
}

/* Tell passport how to deserialize the user */
export const userDeserializer = async (user: LoginUserInputDTO, done: (err: any, tid: any) => void) => {
    try {
        console.log(user)
        if (user && user.email) {
            const profile = await AuthApplication.getCurrentUser({ email: user.email })

            console.log('the profile we got from deserialization', profile)
            done(null, profile)
        }

    } catch (error) {
        done(error, null)

    }

}

/**
 * @function authHandler - Manage the user authentication logic
 * @param passportHandler - The passport instance object
 * @param cb = callback function
 */
export const authHandler = (passportHandler: Authenticator) => (req: Request, res: Response, next: NextFunction, cb: (...args: any[]) => void) => {
    return passportHandler.authenticate('local', cb)(req, res, next)
}



// (req, res, next) => {
//     req.body = userInfo;
//     console.log("In login route", req.user, req.body)


//     passport.authenticate('local', (_err, user, info) => {
//       console.log("IN PASSPORT AUTHENTICATE", info)

//       try {

//         if (!user) {
//           console.log("I got here for info", info)
//           throw new HttpError(409)
//         }

//         req.login(user, function (err) {
//           console.log("I got here to logins")
//           if (err) {
//             logger.error(err)
//             throw new HttpError(401, err)

//           }

//           return res.redirect('/_healthcheck');
//         });
//       } catch (err) {
//         res.json(err)
//       }

//     })
//       (req, res, next);



//   authservice.getUser***
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

// passport.serializeUser((user: { id: any; }, done: (arg0: null, arg1: any) => void) => {
//     console.log('Inside serializeUser callback. User id is save to the session file store here')
//     done(null, user.id);
// });



