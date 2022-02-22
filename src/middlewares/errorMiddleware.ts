import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import HttpStatus from 'http-status-codes';

import { ResponseDTO } from '../dtos/responseDTO';
import { Logger as logger } from '../helpers/customLoggerHelper';
import { ExpressError } from "../interfaces/IError";
import { ExpressResponse } from "../interfaces/IExpress";

export class ErrorMiddleware {
  static notFoundHandle(_req: Request, _res: Response, next: NextFunction): void {
    return next(createError(HttpStatus.NOT_FOUND));
  }
  static errorHandle(error: ExpressError, req: Request, res: Response, _next: NextFunction): void {
    logger.error(error.stack)
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};
    const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).render('error', { layouts: "layout", title: HttpStatus.getStatusText(statusCode) });
  }
  static apiErrorHandle(error: ExpressError, _req: Request, res: Response, _next: NextFunction): Response<ExpressResponse> {
    logger.error(error.stack)
    const statusCode = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message;
    const response = new ResponseDTO(statusCode, message, {});
    return res.status(response.statusCode).send(response);
  }
}
