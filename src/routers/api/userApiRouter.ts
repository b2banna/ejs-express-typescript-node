import { Router } from 'express';

import CONSTANTS from '../../constants';
import UserController from '../../controllers/userController';

export const UserApiRouter = Router();
const userController = new UserController();

UserApiRouter.get(CONSTANTS.ROUTER_PATH.INDEX, (...arg) => userController.getAllUsers(...arg));
UserApiRouter.get(CONSTANTS.ROUTER_PATH.ID_PARAMS, (...arg) => userController.getUserById(...arg));
UserApiRouter.put(CONSTANTS.ROUTER_PATH.ID_PARAMS, (...arg) => userController.updateUserById(...arg));
