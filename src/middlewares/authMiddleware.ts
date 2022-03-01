import { NextFunction, Response } from 'express';

import { CustomRequest } from '../types/CustomRequest';
import MsalMiddleware from './msalMiddleware';

const canAcquireTokenSilent = (tokenExpireTimestamp: number) => {
    const MINUTES = 5; // token will be refreshed 5 minutes before it expires
    const SECONDS = 60; // 1 minute = 60 seconds
    const MINUTES_IN_SECONDS = MINUTES * SECONDS; // 5 minutes in seconds
    const currentTimestamp = Math.floor(Date.now() / 1000);
    tokenExpireTimestamp = (tokenExpireTimestamp - MINUTES_IN_SECONDS);
    return currentTimestamp > tokenExpireTimestamp ? true : false;
}


export default class AuthMiddleware {
    private _msalMiddleware: MsalMiddleware;

    constructor() {
        this._msalMiddleware = MsalMiddleware.getInstance();
    }

    async checkAuth(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        if (req.session.userId && req.app.locals.users && req.app.locals.users[req.session.userId]) {
            const account = req.app.locals.users[req.session.userId].account;
            const tokenExpireTimestamp = account.idTokenClaims.exp;
            if (canAcquireTokenSilent(tokenExpireTimestamp)) {
                try {
                    const response = await this._msalMiddleware.acquireTokenSilent(account);
                    if (!response) {
                        req.session.redirectTo = req.originalUrl;
                        return res.redirect('login');
                    }
                    req.app.locals.users[req.session.userId].accessToken = response.accessToken;
                    req.app.locals.users[req.session.userId].account = response.account;
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


        req.session.redirectTo = req.originalUrl;
        const response = await this._msalMiddleware.getAuthCodeUrl();
        return res.redirect(response);
    }
}
