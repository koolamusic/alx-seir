import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport'
import AuthApplication from '../../application/auth';

import { RegisterController, LoginController, ProfileController } from './controllers';
import { RegisterUserInputDTO, IAuthApplication } from '../../shared/user.interface';
import { isAuthenticated } from '../../core/auth'

/* Initialize methods */
const router = express.Router();
const authApp = new AuthApplication()
const loginController = new LoginController(passport)
const registerController = new RegisterController(authApp as IAuthApplication<RegisterUserInputDTO>)
const profileController = new ProfileController()


router.post('/login', (req, res, next) => loginController.execute(req, res, next));
router.post('/signup', (req, res, next) => registerController.execute(req, res, next));
router.post('/profile', [isAuthenticated], (req: Request, res: Response, next: NextFunction) => profileController.execute(req, res, next));

export default router;

