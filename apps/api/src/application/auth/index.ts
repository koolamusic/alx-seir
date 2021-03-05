import { DocumentType } from '@typegoose/typegoose';
import { encode } from 'js-base64'
import { IAuthApplication, LoginUserDTO, LoginUserInputDTO, RegisterUserDTO, RegisterUserInputDTO } from './../../shared/user.interface';
import { UserModel } from "./model"
import logger from '../../core/logger'
import HttpError from '../../core/errors';
import { UserCollection } from './model'


export default class AuthApplication implements IAuthApplication<UserCollection> {

    async validateUser(user: LoginUserInputDTO): Promise<DocumentType<UserCollection>> {
        try {
            const { email, password } = user


            /* check that the user exists */
            const userDocument = await UserModel.findOne({ email })

            if (!userDocument) throw new HttpError(409, 'Your login credentials is incorrect')

            /* validate the users password entry */
            const passwordMatches = await userDocument.validatePassword(password)
            console.log(userDocument, "WE--------------------", passwordMatches)

            if (!passwordMatches) throw new HttpError(409, 'Your login credentials is incorrect')

            return userDocument

        } catch (error) {
            logger.error(`[AuthApplication:validateUser]: ${error}`);
            throw new HttpError(409, error)

        }
    }

    static async getCurrentUser(user: Pick<UserCollection, 'email'>): Promise<DocumentType<UserCollection> | null> {
        try {
            if (!user) throw new HttpError(401)
            const result = UserModel.findOne({ email: user.email }).select('-password');

            if (!result) throw new HttpError(404)
            return result

        } catch (error) {
            logger.error(`[AuthApplication:getCurrentUser]: ${error}`);
            throw new HttpError(500, error);
        }
    }

    static async executeLogin() { }

    async loginUser(user: UserCollection): Promise<LoginUserDTO> {
        try {
            const result = await this.validateUser(user)
            const userProfile = {
                _id: result._id,
                email: result.email,
                name: result.name,
            }

            return {
                _id: result._id,
                profile: encode(JSON.stringify(userProfile))
            };
        } catch (error) {
            logger.error(`[AuthApplication:loginUser]: ${error}`);
            throw new HttpError(409, `${error}`);
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
            logger.error(`[AuthApplication:registerUser]: ${error}`);
            throw new HttpError(500, `${error}`)
        }
    }
}