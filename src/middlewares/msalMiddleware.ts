import { AccountInfo, AuthenticationResult, AuthorizationCodeRequest, AuthorizationUrlRequest, ConfidentialClientApplication, Configuration, SilentFlowRequest } from '@azure/msal-node';

export default class MsalMiddleware {
    private static _instance: MsalMiddleware;
    private _cca: ConfidentialClientApplication;

    constructor(configuration: Configuration) {
        if (MsalMiddleware._instance) {
            throw new Error("Error - use Singleton.getInstance()");
        }
        this._cca = new ConfidentialClientApplication(configuration);
    }

    static getInstance(): MsalMiddleware {
        const configuration: Configuration = {
            auth: {
                clientId: process.env.MICROSOFT_CLIENT_ID,
                clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
                authority: process.env.MICROSOFT_AUTHORITY
            }
        }
        if (!MsalMiddleware._instance) {
            MsalMiddleware._instance = new MsalMiddleware(configuration);
        }
        return MsalMiddleware._instance;
    }

    public async getAuthCodeUrl(): Promise<string> {
        const request: AuthorizationUrlRequest = {
            redirectUri: process.env.MICROSOFT_REDIRECT_URI,
            scopes: process.env.MICROSOFT_SCOPES.split(',')
        };
        return await this._cca.getAuthCodeUrl(request);
    }

    public async acquireTokenByCode(code: string): Promise<AuthenticationResult | null> {
        const request: AuthorizationCodeRequest = {
            code,
            redirectUri: process.env.MICROSOFT_REDIRECT_URI,
            scopes: process.env.MICROSOFT_SCOPES.split(',')
        };
        return await this._cca.acquireTokenByCode(request);
    }

    public async acquireTokenSilent(account: AccountInfo): Promise<AuthenticationResult | null> {
        const request: SilentFlowRequest = {
            account,
            forceRefresh: true, // This will force a token refresh
            scopes: process.env.MICROSOFT_SCOPES.split(',')
        };
        return await this._cca.acquireTokenSilent(request);
    }

    public async getAllAccounts(): Promise<AccountInfo[]> {
        return await this._cca.getTokenCache().getAllAccounts();
    }

    public async removeAccount(account: AccountInfo): Promise<void> {
        return await this._cca.getTokenCache().removeAccount(account);
    }

}
