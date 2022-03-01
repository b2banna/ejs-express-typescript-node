import { connect, ConnectOptions } from 'mongoose';

import { Logger as logger } from '../helpers/customLoggerHelper';

export class MongoDB {

  static async connect(uri: string) {
    try {
      const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      };
      await connect(uri, options);
      logger.info('MongoDB connected');
    } catch (error) {
      logger.error(error);
      // kill process if failed to connect to the database
      process.exit(1);
    }
  }
}
