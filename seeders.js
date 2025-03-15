import { config } from 'dotenv';
import { dbConnection, Mongoose } from './config/database.js';
import seeders from './src/seeders/index.js';

config();
dbConnection();

const runSeeders = async () => {
  try {
    for (const seed of seeders) {
      const module = await import(`./src/seeders/${seed}Seeder.js`);
      await module.run();
    }
    console.log('All seeders ran successfully.');
  } catch (err) {
    console.error('Seeder error', err);
  } finally {
    Mongoose.connection.close();
  }
};

runSeeders();
