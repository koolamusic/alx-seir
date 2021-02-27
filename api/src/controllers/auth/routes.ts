import express from 'express';
import AuthApplication, { IAuthApplication } from '../../application/auth';

import { RegisterController, ProfileController } from './controllers';
import { RegisterUserInputDTO } from '../../shared/user.interface';
import * as strategy from '../../core/auth'
import HttpError from '../../core/errors';

/* Initialize methods */
const router = express.Router();
const authApp = new AuthApplication()
// const loginController = new LoginController(authApp as IAuthApplication<LoginUserInputDTO>)
const registerController = new RegisterController(authApp as IAuthApplication<RegisterUserInputDTO>)
const profileController = new ProfileController()


const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body);

    try {
        const model = req.body;
        const data = await AuthApplication.getCurrentUser(model)
        console.log(data)
        if (data !== null) {
            res.status(201).json({
                status: 'success',
                data,
                model,
            });
        }
        throw new HttpError(409)
    } catch (error) {
        next(error);
    }
}


router.post('/login', create);
router.post('/signup', registerController.execute);
router.get('/profile', [strategy.isAuthenticated], profileController.execute);

export default router;

