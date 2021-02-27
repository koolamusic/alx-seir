import { DocumentType } from '@typegoose/typegoose';
import { LoginUserDTO, RegisterUserDTO, RegisterUserInputDTO } from './../../shared/user.interface';
import { UserModel } from "./model"
import logger from '../../core/logger'
import HttpError from '../../core/errors';
import { UserCollection } from './model'
import * as crypto from '../../core/crypto.utils'

export interface IAuthApplication<T> {
    validateUser: (user: T) => Promise<DocumentType<UserCollection>>
    // getCurrentUser?: (user: T) => Promise<DocumentType<UserCollection> | null>
    loginUser: (user: T) => Promise<LoginUserDTO>
    registerUser: (user: RegisterUserInputDTO) => Promise<RegisterUserDTO>
}

export default class AuthApplication implements IAuthApplication<UserCollection> {

    async validateUser(user: UserCollection): Promise<DocumentType<UserCollection>> {
        try {
            const { email, password } = user

            /* check that the user exists */
            const userDocument = await UserModel.findOne({ email })
            if (!userDocument) throw new HttpError(404, 'Your login credentials is incorrect')

            /* validate the users password entry */
            // if (!userDocument.validatePassword(password)) throw new HttpError(404, 'Your login credentials is incorrect')
            if (!crypto.validPassword(password, userDocument.password)) throw new HttpError(404, 'Your login credentials is incorrect')

            return userDocument

        } catch (error) {
            logger.error(error)
            throw new HttpError(500, error)

        }
    }

    static async getCurrentUser(user: Pick<UserCollection, 'email'>): Promise<DocumentType<UserCollection> | null> {
        try {
            if (!user) throw new HttpError(401)
            const result = UserModel.findOne({ email: user.email });

            if (!result) throw new HttpError(404)
            return result

        } catch (error) {
            logger.error(error);
            throw new HttpError(500, error);
        }
    }

    async loginUser(user: UserCollection): Promise<LoginUserDTO> {
        try {
            const result = await this.validateUser(user)
            return {
                _id: result._id,
                profile: result.email,
            };
        } catch (error) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async registerUser(data: RegisterUserInputDTO): Promise<RegisterUserDTO> {
        try {
            const { email } = data;
            const document = await UserModel.findOne({ email });
            if (document) {
                throw new HttpError(409, 'Email already exist');
            }
            const result = await UserModel.create({ ...data });
            return {
                _id: result.id,
                profile: result.name,
                name: result.name,
                email: result.email
            }

        } catch (error) {
            logger.error(error);
            throw new HttpError(500, error)
        }
    }
}