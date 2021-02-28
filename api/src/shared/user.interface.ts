import { DocumentType } from '@typegoose/typegoose';
import { UserCollection } from './../application/auth/model';

export interface LoginUserInputDTO {
    email: string,
    password: string,
}
export interface RegisterUserInputDTO {
    name: string,
    email: string,
    password: string,
}

export interface LoginUserDTO {
    _id: string
    profile: string
}

export interface RegisterUserDTO {
    _id: string
    profile: string
    name: string,
    email: string,
}

export interface IAccountProfile extends DocumentType<UserCollection> { }

export interface IAuthApplication<T> {
    validateUser: (user: T) => Promise<DocumentType<UserCollection>>
    getCurrentUser?: (user: T) => Promise<DocumentType<UserCollection> | null>
    loginUser: (user: T) => Promise<LoginUserDTO>
    registerUser: (user: RegisterUserInputDTO) => Promise<RegisterUserDTO>
}