import { Request, Response, NextFunction } from 'express'
import { PassportStatic } from 'passport';
import onHeaders from 'on-headers'
import { encode } from 'js-base64'
import AuthApplication from '../../application/auth';
import HttpError from '../../core/errors';
import logger from '../../core/logger'
import BaseController from '../../shared/base.controller'
import { RegisterUserInputDTO, RegisterUserDTO, LoginUserInputDTO, LoginUserDTO, IAccountProfile, IAuthApplication } from '../../shared/user.interface';


export class RegisterController extends BaseController {
    private authApplication: IAuthApplication<RegisterUserInputDTO>;

    constructor(authApplication: IAuthApplication<RegisterUserInputDTO>) {
        super();
        this.authApplication = authApplication;
    }

    protected async executeImpl(req: Request, res: Response, _next: NextFunction) {
        const model: RegisterUserInputDTO = req.body;
        const result = await this.authApplication.registerUser(model)

        if (!result) throw new HttpError(409, "could not register user")
        return this.success<RegisterUserDTO>(res, result)
    }
}

export class LoginController extends BaseController {
    private passportHandler: PassportStatic

    constructor(passportHandler: PassportStatic) {
        super();
        this.passportHandler = passportHandler
    }


    protected async executeImpl(req: Request, res: Response, next: NextFunction) {

        const passportCallback = (err: any, user: IAccountProfile, info: any) => {
            console.log("IN PASSPORT CONTROLLER CALLBACK", user)
            try {

                if (err) throw new HttpError(409, `${err}`)
                if (!user) throw new HttpError(409, `login credentials: ${info}`)

                /* Execute login in Express Request */
                req.login(user, (err) => {
                    if (err) {
                        logger.error(`[LoginController:passportCallback] ${err}`)
                        throw new HttpError(401, err)
                    }
                    const userProfile = {
                        _id: user._id,
                        // profile: encode(JSON.stringify({
                        //     _id: user._id,
                        //     email: user.email,
                        //     name: user.name,
                        // }))
                        profile: encode(user.name),
                    };


                    onHeaders(res, function () {
                        // Try to get the final Set Cookie Headers
                        console.log(res.get('Set-Cookie'), "--------- COOKIES---------");
                    });



                    // console.log(userProfile, res.get('user'))
                    this.success<LoginUserDTO>(res, userProfile)
                });

            } catch (err) {
                logger.error(`[LoginController:passportCallback] ${err}`)
                next(err)

            }
        }
        /* Wrap and execute login request */
        this.passportHandler.authenticate('local', passportCallback)(req, res, next)

    }
}




export class ProfileController extends BaseController {
    protected async executeImpl(req: Request, res: Response, _next: NextFunction) {
        const model: LoginUserInputDTO = req.body;
        const result = await AuthApplication.getCurrentUser(model)

        if (!result) throw new HttpError(409, "Could not get profile")
        return this.success<IAccountProfile>(res, result)
    }
}