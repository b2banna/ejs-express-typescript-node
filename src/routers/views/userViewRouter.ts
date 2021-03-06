import { Router } from 'express';

import CONSTANTS from '../../constants';
import UserController from '../../controllers/userController';

export const UserViewRouterHandler = Router();
const userController = new UserController();

UserViewRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (...arg) => userController.viewAllUsers(...arg));
