import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { UserService } from '../services/userService';

export default class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  async viewAllUsers(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      return res.render('users', { layouts: "layout", title: 'Users' });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
    try {
      const body = await this._userService.getAllUsers();
      const code = HttpStatus.OK;
      return res.status(code).send(body);
    } catch (error: any) {
      const body = (error as Error).message;
      const code = HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(code).send(body);
    }
  }

  async updateUserById(req: Request, res: Response, _next: NextFunction): Promise<Response> {
    const id: string = req.params.id;
    const user = req.body;
    try {
      const body = await this._userService.updateUserById(id, user);
      const code = HttpStatus.OK;
      return res.status(code).send(body);
    } catch (error: any) {
      const body = (error as Error).message;
      const code = HttpStatus.INTERNAL_SERVER_ERROR;
      return res.status(code).send(body);
    }
  }
}
