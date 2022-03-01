declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPRESS_SESSION_SECRET: string;
      MICROSOFT_AUTHORITY: string;
      MICROSOFT_CLIENT_ID: string;
      MICROSOFT_CLIENT_SECRET: string;
      MICROSOFT_REDIRECT_URI: string;
      MICROSOFT_SCOPES: string;
      MONGODB_URI: string;
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      port?: string;
    }
  }
}

export { };
