require('dotenv').config();

import cors from 'cors';
import express, { json, NextFunction, Request, Response, urlencoded } from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import helmet from 'helmet';
import { join } from 'path';

import CONSTANTS from './constants';
import { Logger as logger } from './helpers/customLoggerHelper';
import { MongoDB } from './database';
import { ErrorMiddleware } from './middlewares/errorMiddleware';
import { LogMiddleware } from "./middlewares/logMiddleware";
import { ApiRouterHandler, ViewRouterHandler } from './routers';

const port = process.env.PORT || process.env.port || "3000";
const app = express();
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sample-mflix";
MongoDB.connect(uri);

// Setup middlewares
app.use(helmet());
app.use((_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '..', 'public')));

// view engine setup
app.set('views', join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

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
