require('dotenv').config();

import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import session from 'express-session';
import helmet from 'helmet';
import { join } from 'path';

import CONSTANTS from './constants';
import { MongoDB } from './database';
import { Logger as logger } from './helpers/customLoggerHelper';
import { ErrorMiddleware } from './middlewares/errorMiddleware';
import { LogMiddleware } from "./middlewares/logMiddleware";
import { ApiRouterHandler, ViewRouterHandler } from './routers';
import { CustomRequest } from './types/CustomRequest';

const port = process.env.PORT || process.env.port || "3000";
const app = express();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
MongoDB.connect(uri);

app.locals.users = {};

// Setup middlewares
app.use(helmet());
app.use((_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});
app.use(session(CONSTANTS.EXPRESS_SESSION as session.SessionOptions));
app.use(flash());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ErrorMiddleware.flashErrorHandler);
app.use((req: CustomRequest, res: Response, next: NextFunction): void => {
  if (req.session.userId) {
    res.locals.user = app.locals.users[req.session.userId];
  }
  next();
});
app.use(express.static(join(__dirname, '..', 'public')));

// view engine setup
app.set('views', join(__dirname, '..', 'views'));
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');

// log middleware
app.use(LogMiddleware.logHandler);

// Setup router handler, not found handler and error handler for API router
app.use(CONSTANTS.ROUTER_PATH.API_BASE_PATH, ApiRouterHandler);
app.use(CONSTANTS.ROUTER_PATH.API_BASE_PATH, ErrorMiddleware.notFoundHandle);
app.use(CONSTANTS.ROUTER_PATH.API_BASE_PATH, ErrorMiddleware.apiErrorHandle);

// Setup router handler, not found handler and error handler for Views router
app.use(CONSTANTS.ROUTER_PATH.INDEX, ViewRouterHandler);
app.use(ErrorMiddleware.notFoundHandle);
app.use(ErrorMiddleware.errorHandle);

// Start server
app.listen(port, async () => {
  logger.info(`Server started on port ${port}`);
});
