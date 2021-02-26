/**
 * We want to validate the user information to configure this local strategy
 * 1. Define Validation Logic for Local Strategy
 * 2. Add Serializer for Authentication
 * 3. Add Deserializer for Sessions and protected routes
 */
import { Request, Response, NextFunction } from 'express'
import { Strategy, VerifyFunction, IStrategyOptions } from 'passport-local'
import { getCurrentUser } from './../application/auth';
import HttpError from './errors'



const strategyOptions: IStrategyOptions = {
    usernameField: 'email',

}


const verifyUser: VerifyFunction = async (username, password, done) => {
    if (username && password) {
        const user = await getCurrentUser({ email: username })
        if (!user) {
            throw new HttpError(401);
        }
        return done(null, user)

    }
    throw new HttpError(401);

}

export const localStrategy = new Strategy(strategyOptions, verifyUser)



// export default function localStrategy() {
//     return new Strategy(strategyOptions, verifyUser)
// }




// { usernameField: 'email' },
// verifyUser
// (email: string, password: string, done: (arg0: null, arg1: { id: string; email: string; password: string; }) => any) => {
//     console.log('Inside local strategy callback')
//     // here is where you make a call to the database
//     // to find the user based on their username or email address
//     // for now, we'll just pretend we found that it was users[0]
//     const user = users[0]
//     if (email === user.email && password === user.password) {
//         console.log('Local strategy returned true')
//         return done(null, user)
//     }
// }
// );

// tell passport how to serialize the user
// passport.serializeUser((user: { id: any; }, done: (arg0: null, arg1: any) => void) => {
//     console.log('Inside serializeUser callback. User id is save to the session file store here')
//     done(null, user.id);
// });

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });






/* Middleware to check if user is authenticated in routes */
export const isAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
    try {
        console.log(req.isAuthenticated(), req.isUnauthenticated())
        if (!req.isAuthenticated()) {
            throw new HttpError(401)
        }
        next()
    } catch (error) {
        next(error)
    }
}