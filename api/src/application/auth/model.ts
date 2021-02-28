import * as crypto from '../../core/crypto.utils';
import { getModelForClass, prop, DocumentType, pre } from '@typegoose/typegoose'


/* Typegoose Hook to hash password and save into db record */
@pre<UserCollection>('save', function () {
    if (this.isModified('password') || this.isNew) {
        this.password = crypto.encryptPassword(this.password)
    }
})

/* Declare user class */
export class UserCollection {

    @prop({ required: true, unique: true })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop()
    public name!: string;

    public async validatePassword(this: DocumentType<UserCollection>, inputPassword: string) {
        return crypto.validPassword(inputPassword, this.password)
    }
}




export const UserModel = getModelForClass(UserCollection)