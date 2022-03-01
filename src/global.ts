declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      port?: string;
      MONGODB_URI: string;
      OAUTH_APP_ID: string;
      OAUTH_APP_SECRET: string;
      OAUTH_REDIRECT_URI: string;
      OAUTH_SCOPES: string;
      OAUTH_AUTHORITY: string;
      EXPRESS_SESSION_SECRET: string;
    }
  }
}

export { };
