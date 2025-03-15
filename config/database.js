import Mongoose from 'mongoose';
import log from '../src/utils/console.js';

/**
 * @description This function is used to establish database connection with mmongoDB
 */
const dbConnection = () => {
  if (Mongoose.connection.readyState === 0) {
    Mongoose.set('strictQuery', false);
    Mongoose.connect(process.env.DB_URL);
    Mongoose.connection.on('error', (err) => {
      log.error(err);
    });

    Mongoose.connection.on('connected', () => {
      log.cyan(`⚡ MongoDB Connected ⚡ - ${process.env.NODE_ENV}`);
    });
  }
};
export { dbConnection, Mongoose };
