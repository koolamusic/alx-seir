export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    username?: string, // need to test this out
}