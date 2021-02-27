import { IUser } from './../../shared/user.interface';
import { UserModel } from "./model"
import logger from '../../core/logger'
// import * as crypto from '../../core/crypto.utils'
import HttpError from '../../core/errors';


export const validateUser = async (user: IUser) => {
    try {
        const { email, password } = user

        /* check that the user exists */
        const userDocument = await UserModel.findOne({ email })
        if (!userDocument) throw new HttpError(404, 'Your login credentials is incorrect')

        /* validate the users password entry */
        if (!userDocument.validatePassword(password)) throw new HttpError(404, 'Your login credentials is incorrect')
        // if (!crypto.validPassword(password, userDocument.password)) throw new HttpError(404, 'Your login credentials is incorrect')

        return { ...userDocument }

    } catch (error) {
        logger.error(error)
        throw new HttpError(500, error)

    }
}

export const getCurrentUser = async (user: Pick<IUser, 'email'>) => {
    try {
        if (!user) throw new HttpError(401)
        return await UserModel.findOne({ email: user.email });
    } catch (error) {
        logger.error(error);
        throw new HttpError(500, error);
    }
}

export const loginUser = async (user: IUser) => {
    try {

        const result = await validateUser(user)
        return {
            _id: result._id,
            name: result.name,
            email: result.email
        };
    } catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

export const registerUser = async (data: Omit<IUser, '_id'>) => {
    try {
        const { email } = data;
        const result = await UserModel.findOne({ email });
        if (result) {
            throw new HttpError(409, 'Email already exist');
        }
        return await UserModel.create({ ...data });

    } catch (error) {
        logger.error(error);
        throw new HttpError(500, error)
    }
}