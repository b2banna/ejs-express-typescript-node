import { Router } from 'express';

import AuthController from '../../controllers/authController';

export const AuthViewRouterHandler = Router();
const authController = new AuthController()

AuthViewRouterHandler.get('/signin', (...arg) => authController.signIn(...arg));
AuthViewRouterHandler.get('/callback', (...arg) => authController.callBack(...arg));
AuthViewRouterHandler.get('/signout', (...arg) => authController.signOut(...arg));
