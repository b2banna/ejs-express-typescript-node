import { connect } from 'mongoose';

export class MongoDB {

  static async connect(uri: string) {
    try {
      await connect(uri);
      console.log(`\nConnect to the MongoDB database!`);
    } catch (error) {
      console.log(`\n[ERROR] Failed to the MongoDB database`, error);
      // kill process if failed to connect to the database
      process.exit(1);
    }
  }
}
