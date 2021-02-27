import { Request, Response, NextFunction } from 'express'
import AuthApplication, { IAuthApplication } from '../../application/auth';
import HttpError from '../../core/errors';
import BaseController from '../../shared/base.controller'
import { RegisterUserInputDTO, RegisterUserDTO, LoginUserInputDTO, LoginUserDTO, IAccountProfile } from '../../shared/user.interface';


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
    private authApplication: IAuthApplication<LoginUserInputDTO>;

    constructor(authApplication: IAuthApplication<LoginUserInputDTO>) {
        super();
        this.authApplication = authApplication;
    }

    async executeImpl(req: Request, res: Response, next: NextFunction) {
        console.log("i got here", req.session, this.authApplication)

        try {
            if (!req.body) throw new HttpError(422)

            const model: LoginUserInputDTO = req.body;
            const result = await this.authApplication.loginUser(model)

            if (!result) throw new HttpError(409, "could not login user")
            this.success<LoginUserDTO>(res, result)

        } catch (error) {
            next(error)
        }
    }
}

export class ProfileController extends BaseController {
    // private authApplication: IAuthApplication<LoginUserInputDTO>;

    // constructor(authApplication: IAuthApplication<LoginUserInputDTO>) {
    //     super();
    //     this.authApplication = authApplication;
    // }

    protected async executeImpl(req: Request, res: Response, _next: NextFunction) {
        const model: LoginUserInputDTO = req.body;
        const result = await AuthApplication.getCurrentUser(model)

        if (!result) throw new HttpError(409, "could not get profile")
        return this.success<IAccountProfile>(res, result)
    }
}