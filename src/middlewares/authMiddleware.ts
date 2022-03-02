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
            // if user and userId are not set in session, try to get auth code using url
            req.session.redirectTo = req.originalUrl;
            const response = await this._msalMiddleware.getAuthCodeUrl();
            return res.redirect(response);
        }

        const account = user.account;
        const tokenExpireTimestamp = account.idTokenClaims.exp;
        const isTokenExpired = this._canAcquireTokenSilent(tokenExpireTimestamp);
        if (!isTokenExpired) {
            // if token is not expired, continue
            const redirectUrl = req.session.redirectTo ? req.session.redirectTo : '';
            if (!redirectUrl) return next(); // if redirectUrl is not set, then continue
            req.session.redirectTo = '';
            // if redirectUrl is set, then redirect to that url
            return res.redirect(redirectUrl);
        }

        try {
            // if token is expired, try to acquire token silently
            const response = await this._msalMiddleware.acquireTokenSilent(account);
            if (!response) {
                // if acquireTokenSilent fails, then redirect to login page
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
        return next();
    }
}
