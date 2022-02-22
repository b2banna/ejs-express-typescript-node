import { NextFunction, Request, Response, Router } from 'express';

import CONSTANTS from '../../constants';
import { UserViewRouter } from './userViewRouter';

export const ViewRouterHandler = Router();

ViewRouterHandler.use(CONSTANTS.ROUTER_PATH.USER_PATH, UserViewRouter);

ViewRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (_req: Request, res: Response, _next: NextFunction): void => {
  return res.render('index', { layouts: "layout", title: 'Hello world!' });
});
