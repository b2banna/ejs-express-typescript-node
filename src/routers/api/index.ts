import { NextFunction, Request, Response, Router } from 'express';

import CONSTANTS from '../../constants';
import { UserApiRouter } from './userApiRouter';

export const ApiRouterHandler = Router();

ApiRouterHandler.use(CONSTANTS.ROUTER_PATH.USER_PATH, UserApiRouter)
ApiRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (_req: Request, res: Response, _next: NextFunction) => res.send("Hello World!"));
