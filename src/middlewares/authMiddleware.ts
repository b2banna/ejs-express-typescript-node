import { NextFunction, Response } from 'express';

import { CustomRequest } from '../types/CustomRequest';
import MsalMiddleware from './msalMiddleware';


export default class AuthMiddleware {
    private _msalMiddleware: MsalMiddleware;

    constructor() {
        this._msalMiddleware = MsalMiddleware.getInstance();
    }

    private _canAcquireTokenSilent(tokenExpireTimestamp: number): boolean {
        const MINUTES = 5; // token will be refreshed 5 minutes before it expires
        const SECONDS = 60; // 1 minute = 60 seconds
        const MINUTES_IN_SECONDS = MINUTES * SECONDS; // 5 minutes in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);
        tokenExpireTimestamp = (tokenExpireTimestamp - MINUTES_IN_SECONDS);
        return currentTimestamp > tokenExpireTimestamp ? true : false;
    }

    async checkAuth(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        const user = req.session.user;
        const userId = req.session.userId;
        if (!user || !userId) {
            req.session.redirectTo = req.originalUrl;
            const response = await this._msalMiddleware.getAuthCodeUrl();
            return res.redirect(response);
        }

        const account = user.account;
        const tokenExpireTimestamp = account.idTokenClaims.exp;
        if (this._canAcquireTokenSilent(tokenExpireTimestamp)) {
            try {
                const response = await this._msalMiddleware.acquireTokenSilent(account);
                if (!response) {
                    req.session.redirectTo = req.originalUrl;
                    return res.redirect('login');
                }
                user.accessToken = response.accessToken;
                user.account = response.account;
                req.app.locals.users[userId] = req.session.user = user;
            }
            catch (error) {
                req.flash('error_msg', ['Error getting auth URL', JSON.stringify(error, Object.getOwnPropertyNames(error))]);
                req.session.redirectTo = req.originalUrl;
                return res.redirect('login');
            }
        }
        const redirectUrl = req.session.redirectTo ? req.session.redirectTo : '';
        if (redirectUrl) {
            req.session.redirectTo = '';
            return res.redirect(redirectUrl);
        }
        return next();


    }
}
