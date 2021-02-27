import express from 'express';
import AuthApplication, { IAuthApplication } from '../../application/auth';

import { RegisterController, LoginController, ProfileController } from './controllers';
import { RegisterUserInputDTO, LoginUserInputDTO } from '../../shared/user.interface';
import * as strategy from '../../core/auth'
import HttpError from '../../core/errors';

/* Initialize methods */
const router = express.Router();
const authApp = new AuthApplication()
const loginController = new LoginController(authApp as IAuthApplication<LoginUserInputDTO>)
const registerController = new RegisterController(authApp as IAuthApplication<RegisterUserInputDTO>)
const profileController = new ProfileController()


const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body, "here in routes");

    try {
        const model = req.body;
        const data = await new AuthApplication().loginUser(model)
        console.log(data)
        if (data !== null) {
            res.status(201).json({
                status: 'success',
                data,
                model,
            });
        }
        throw new HttpError(409, "Create encountered an error")
    } catch (error) {
        next(error);
    }
}


router.post('/create', create);
router.post('/login', (req, res, next) => loginController.execute(req, res, next));
router.post('/signup', (req, res, next) => registerController.execute(req, res, next));
router.get('/profile', [strategy.isAuthenticated], profileController.execute);

export default router;

