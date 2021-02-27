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