import { Request } from "express";
import { Session } from "express-session";

type User = {
  userId?: string
}

export type SessionWithUser = Session & User & { redirectTo?: string };

export type CustomRequest = Request & {
  session?: SessionWithUser
};

