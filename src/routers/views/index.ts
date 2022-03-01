import { Router } from 'express';

import CONSTANTS from '../../constants';
import AuthMiddleware from '../../middlewares/authMiddleware';
import { CustomRequest } from '../../types/CustomRequest';
import { AuthViewRouterHandler } from './authViewRouter';
import { UserViewRouterHandler } from './userViewRouter';

export const ViewRouterHandler = Router();
const authMiddleware = new AuthMiddleware();

ViewRouterHandler.use(CONSTANTS.ROUTER_PATH.USER_PATH, (...arg) => authMiddleware.checkAuth(...arg), UserViewRouterHandler);
ViewRouterHandler.use(CONSTANTS.ROUTER_PATH.AUTH_PATH, AuthViewRouterHandler);
ViewRouterHandler.get(CONSTANTS.ROUTER_PATH.LOGIN_PATH, (_req, res, _next) => res.render('login/index', { layouts: "layout", title: 'Login' }));
ViewRouterHandler.get(CONSTANTS.ROUTER_PATH.INDEX, (...arg) => authMiddleware.checkAuth(...arg), (_req: CustomRequest, res, _next) => res.render('index', { layouts: "layout", title: 'Home' }));
