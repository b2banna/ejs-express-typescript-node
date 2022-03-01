import { AccountInfo } from '@azure/msal-node';
import { NextFunction, Request, Response } from 'express';

import MsalMiddleware from '../middlewares/msalMiddleware';
import GraphService from '../services/graphService';
import { CustomRequest } from '../types/CustomRequest';

export default class AuthController {
    private _msalMiddleware: MsalMiddleware;
    private _graphService: GraphService;

    constructor() {
        this._msalMiddleware = MsalMiddleware.getInstance();
        this._graphService = new GraphService();
    }

    async signIn(req: Request, res: Response, _next: NextFunction) {
        try {
            const url = await this._msalMiddleware.getAuthCodeUrl();
            res.redirect(url);
        }
        catch (error) {
            req.flash('error_msg', ['Error getting auth URL', JSON.stringify(error, Object.getOwnPropertyNames(error))]);
            res.render('error');
        }
    }

    async callBack(req: CustomRequest, res: Response, _next: NextFunction) {
        try {
            const code = `${req.query.code}`;
            const response = await this._msalMiddleware.acquireTokenByCode(code);
            if (!response) {
                req.flash('error_msg', ['Error getting auth URL']);
                return res.render('error');
            }
            const { account, accessToken } = response;
            const { displayName, mail, userPrincipalName } = await this._graphService.getUserDetails(accessToken);


            // Save the user's homeAccountId in their session
            req.session.userId = `${account?.homeAccountId}`;

            const photoBlob = await this._graphService.getUserPhoto(response.accessToken);

            // Add the user to user storage
            req.app.locals.users[req.session.userId] = {
                accessToken,
                account,
                displayName,
                photo: photoBlob,
                email: mail || userPrincipalName,
            };
        } catch (error) {
            req.flash('error_msg', ['Error completing authentication', JSON.stringify(error, Object.getOwnPropertyNames(error))]);
            return res.render('error');
        }

        res.redirect('/');
    }
    async signOut(req: CustomRequest, res: Response, _next: NextFunction) {
        if (req.session.userId) {
            // Look up the user's account in the cache
            const accounts = await this._msalMiddleware.getAllAccounts();
            const account = accounts.find((account: AccountInfo) => account.homeAccountId === req.session.userId);
            // Remove the account
            if (account) await this._msalMiddleware.removeAccount(account);
        }

        // Destroy the user's session
        req.session.destroy((_err) => res.redirect('/'));
    }

}
