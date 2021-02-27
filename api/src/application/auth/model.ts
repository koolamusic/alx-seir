import * as crypto from '../../core/crypto.utils';
import { getModelForClass, prop, DocumentType, pre } from '@typegoose/typegoose'


/* Typegoose Hook to hash password and save into db record */
@pre<User>('save', function () {
    if (this.isModified('password') || this.isNew) {
        this.password = crypto.encryptPassword(this.password)
    }
})

/* Declare user class */
class User {

    @prop({ required: true, unique: true, alias: 'username' })
    public email!: string;

    @prop({ required: true })
    public password!: string;

    @prop()
    public name?: string;

    public async validatePassword(this: DocumentType<User>, inputPassword: string) {
        return crypto.validPassword(this.password, inputPassword)
    }
}




export const UserModel = getModelForClass(User)