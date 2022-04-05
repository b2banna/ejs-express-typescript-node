import { NextFunction, Request, Response, Router } from 'express';

import { UserApiRouter } from './userApiRouter';
import CONSTANTS from '../../constants';
import AuthMiddleware from '../../middlewares/authMiddleware';

export const ApiRouterHandler = Router();
const authMiddleware = new AuthMiddleware();

ApiRouterHandler.use(CONSTANTS.ROUTER_PATH.USER_PATH, (...arg) => authMiddleware.checkAuthForRestAPIs(...arg), UserApiRouter)
ApiRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (_req: Request, res: Response, _next: NextFunction) => res.send("Hello World!"));
