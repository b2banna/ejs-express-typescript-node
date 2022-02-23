import { Router } from 'express';

import CONSTANTS from '../../constants';
import UserController from '../../controllers/userController';

export const ViewRouterHandler = Router();
const userController = new UserController();

ViewRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (...arg) => userController.viewAllUsers(...arg));
