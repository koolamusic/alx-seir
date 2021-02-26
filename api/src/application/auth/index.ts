// import logger from 'apps/api/src/core/logger';
// import UserModel from "./../domain/user.model"
// import jwt from 'jsonwebtoken';
// import bcrypt from "bcryptjs"
// import  EmailUtils  from '../../../utils/email.util';


//     export const getCurrentUser = async (user) => {
//         try {
//             if (!user) throw new Error('Login to continue');
//             return await UserModel.findOne({ _id: user._id });
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }

//     export const signUp = async (data, req) => {
//         try {
//             const { email } = data;
//             const result = await UserModel.findOne({ email });
//             if (result) {
//                 throw new Error('Email already exist');
//             }
//             const user = await UserModel.create({ ...data });

//             if (user) {
//                 const tokenValue = {
//                     _id: user._id,
//                     email: user.email,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                 };
//                 const token = await jwt.sign(tokenValue, process.env.SECRET_KEY, { expiresIn: process.env.expiresIn });
//                 const message = await EmailUtils.getTemplate(
//                     'activation',
//                     {
//                         username: `${user.firstName} ${user.lastName}`,
//                         verificationLink: `${req.headers.origin}/emailVerify?token=${token}`,
//                     },
//                     {
//                         escape: (html) => {
//                             return String(html);
//                         },
//                     }
//                 );

//                 EmailUtils.sendMail(user.email, message, 'Account Activation').catch((error) => console.error(error));
//                 return {
//                     email: user.email,
//                     _id: user._id,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     token,
//                 };
//             }
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }


//     export const  verifyEmail =  async (token) => {
//         const verifyingUser = await jwt.verify(token, process.env.SECRET_KEY);
//         const user = await UserModel.findOne({_id: verifyingUser._id})
//         if(user){
//             user.isVerified = true
//             await user.save()
//             return "Account successfully verified"
//         }else{
//             throw new Error("Failed to verify your account")
//         }
//     }


//     export const login = async (data) => {
//         try {
//             const { email, password } = data;
//             const result = await UserModel.findOne({ email: email });
//             if (!result) throw new Error('Invalid email');

//             const isPassword = await bcrypt.compare(password, result.password);
//             if (!isPassword) throw new Error('Invalid password');
//             const tokenValue = {
//                 _id: result._id,
//                 email: result.email,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//             };
//             const token = await jwt.sign(tokenValue, process.env.SECRET_KEY, { expiresIn: process.env.expiresIn });
//             return {
//                 email: result.email,
//                 _id: result._id,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//                 token,
//             };
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }


//     export const forgotPassword = async (email, req) => {
//         try {
//             const result = await UserModel.findOne({ email: email });
//             if (!result) throw new Error('User account not found');
//             const pin = EmailUtils.pingGen();
//             result.resetPasswordToken = pin;
//             result.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//             await result.save();
//             const message: any = await EmailUtils.getTemplate(
//                 'forgotPassword',
//                 {
//                     username: `${result.firstName} ${result.lastName}`,
//                     pin: pin,
//                     verificationLink: `${req.headers.origin}/reset_password?otp=${pin}`,
//                 },
//                 {
//                     escape: (html) => {
//                         return String(html);
//                     },
//                 }
//             );
//             EmailUtils.sendMail(result.email, message, 'Reset Password').catch((error) => console.error(error));
//             return 'OTP sent to your mail';
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }


//     export const resetPassword = async (data) => {
//         try {
//             const { password, confirmPassword, otp } = data;
//             if (password !== confirmPassword) throw new Error('Password do not match');
//             const result = await UserModel.findOne({
//                 $or: [{ resetPasswordToken: otp }],
//                 resetPasswordExpires: { $gt: Date.now() },
//             });
//             if (!result) throw new Error('OTP expired or invalid password reset pin');
//             result.resetPasswordToken = undefined;
//             result.resetPasswordExpires = undefined;
//             result.password = password;
//             await result.save();
//             const tokenValue = {
//                 _id: result._id,
//                 email: result.email,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//             };
//             return {
//                 email: result.email,
//                 _id: result._id,
//                 firstName: result.firstName,
//                 lastName: result.lastName,
//                 token: await jwt.sign(tokenValue, process.env.SECRET_KEY, { expiresIn: process.env.expiresIn }),
//             };
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }

//     export const changePassword = async (data,user) => {
//         try {
//             if (!user) throw new Error('Login to continue');
//             const result = await UserModel.findById(user._id);
//             if (!result) throw new Error('cannot find user account trying to change password');
//             const isPassword = await bcrypt.compare(data.currentPassword, result.password);
//             if (!isPassword) throw new Error('Current password is incorrect');
//             result.password = data.newPassword;
//             await result.save();
//             return 'Password updated';
//         } catch (error) {
//             logger.error(error);
//             throw new Error(error);
//         }
//     }