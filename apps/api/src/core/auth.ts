/**
 * We want to validate the user information to configure this local strategy
 * 1. Define Validation Logic for Local Strategy
 * 2. Add Serializer for Authentication
 * 3. Add Deserializer for Sessions and protected routes
 */
import passport from 'passport';
import { Request, Response, NextFunction } from 'express'
import { Strategy, IStrategyOptionsWithRequest, VerifyFunctionWithRequest } from 'passport-local'
import { LoginUserInputDTO } from '../shared/user.interface';
import AuthApplication from './../application/auth';
import HttpError from './errors'
import logger from './logger'


/* Passport local strategy options */
const strategyOptions: IStrategyOptionsWithRequest = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
    session: true
}

// const mockPayload = {
//     name: "Amaloar",
//     email: 'rubik@mail.com',
//     username: 'rubik@mail.com',
//     password: "123456"
// }

const verifyUser: VerifyFunctionWithRequest = async (_req, username, password, done) => {
    try {
        if (username && password) {
            const user = await new AuthApplication().validateUser({ email: username, password })
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

export const authHandler = (passportHandler: passport.PassportStatic) => (req: Request, res: Response, next: NextFunction) => {
    console.log("In Authentication Handler",)
    const passportCallback = (err: any, user: Request, info: any) => {
        console.log("IN PASSPORT AUTHENTICATE CALLBACK", user)
        try {

            if (err) {
                throw new HttpError(409, `${err}`)
            }

            if (!user) {
                throw new HttpError(409, `login credentials: ${info}`)
            }

            req.login(user, function (err) {
                if (err) {
                    logger.error(`[strategy:authHandler] ${err}`)
                    throw new HttpError(401, err)

                }
                return res.redirect('/_healthcheck');
            });

        } catch (err) {
            logger.error(`[strategy:authHandler] ${err}`)
            throw new HttpError(409, `${err}`)

        }
    }

    passportHandler.authenticate('local', passportCallback)(req, res, next)
}



