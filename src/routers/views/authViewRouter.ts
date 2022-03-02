import { Router } from 'express';

import CONSTANTS from '../../constants';
import AuthController from '../../controllers/authController';

export const AuthViewRouterHandler = Router();
const authController = new AuthController()

AuthViewRouterHandler.get(CONSTANTS.ROUTER_PATH.SIGN_IN_PATH, (...arg) => authController.signIn(...arg));
AuthViewRouterHandler.get(CONSTANTS.ROUTER_PATH.CALL_BACK_PATH, (...arg) => authController.callBack(...arg));
AuthViewRouterHandler.get(CONSTANTS.ROUTER_PATH.SIGN_OUT_PATH, (...arg) => authController.signOut(...arg));
