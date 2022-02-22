// import { ExpressError } from './interfaces/IError';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      port?: string;
      MONGODB_URI: string;
    }
  }
}

export { };
