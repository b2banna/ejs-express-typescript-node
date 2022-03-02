import { NextFunction, Request, Response, Router } from 'express';

import { UserApiRouter } from './userApiRouter';
import CONSTANTS from '../../constants';

export const ApiRouterHandler = Router();

ApiRouterHandler.use(CONSTANTS.ROUTER_PATH.USER_PATH, UserApiRouter)
ApiRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (_req: Request, res: Response, _next: NextFunction) => res.send("Hello World!"));
