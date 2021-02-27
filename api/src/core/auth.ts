/**
 * We want to validate the user information to configure this local strategy
 * 1. Define Validation Logic for Local Strategy
 * 2. Add Serializer for Authentication
 * 3. Add Deserializer for Sessions and protected routes
 */
import { Request, Response, NextFunction } from 'express'
import { Strategy, VerifyFunction, IStrategyOptions } from 'passport-local'
import { IUser } from '../shared/user.interface';
// import { getCurrentUser } from './../application/auth';
import HttpError from './errors'


/* Passport local strategy options */
const strategyOptions: IStrategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    session: true
}

const mockPayload = {
    name: "Amaloar",
    email: 'rubik@mail.com',
    username: 'rubik@mail.com',
    password: "123456"
}

const verifyUser: VerifyFunction = async (_username, _password, done) => {
    console.log("GOT FIRED")
    return done(null, mockPayload)

    // try {
    //     if (username && password) {
    //         const user = await getCurrentUser({ email: username })
    //         if (!user) {
    //             throw new HttpError(401);
    //         }
    //         return done(null, user)
    //     }
    // } catch (error) {
    //     done(error)
    //     throw new HttpError(401);
    // }

}

export const localStrategy = new Strategy(strategyOptions, verifyUser)


/* Middleware to check if user is authenticated in routes */
export const isAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
    try {
        console.log(req.isAuthenticated(), req.isUnauthenticated())
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

export const userDeserializer = async (user: IUser, done: (err: any, tid: any) => void) => {
    try {
        console.log(user)
        if (user && user.email) {
            // const profile = await getCurrentUser({ email: user.email })
            let profile = mockPayload

            console.log('the profile we got from deserialization', profile)
            done(null, profile)
        }

    } catch (error) {
        done(error, false)

    }

}


//   authservice.getUser***
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

// passport.serializeUser((user: { id: any; }, done: (arg0: null, arg1: any) => void) => {
//     console.log('Inside serializeUser callback. User id is save to the session file store here')
//     done(null, user.id);
// });



