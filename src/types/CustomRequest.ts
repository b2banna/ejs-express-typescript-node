import { Request } from "express";
import { Session } from "express-session";
import { IObject } from "../interfaces/IObject";

type User = {
  userId?: string;
  user?: IObject<any>;
}

export type SessionWithUser = Session & User & { redirectTo?: string };

export type CustomRequest = Request & {
  session?: SessionWithUser
};

