import * as mongoose from 'mongoose';
import { logger } from '@modules';
import env from '@config/env';

type DbClient = mongoose.Mongoose;

export default DbClient;

export const getDatabaseClient = async (
  dbHost: string,
  dbName: string,
): Promise<DbClient> => {
  const connString = `mongodb://${dbHost}/${dbName}`;

  try {
    const client = await mongoose.connect(connString, {
      serverSelectionTimeoutMS: Number(env.DB_CONN_TIMEOUT),
    });

    logger.info('[DbClient] Connected to database.');

    return client;
  } catch (error) {
    logger.error('[DbClient] MongoDB connection error: ', error);
    logger.info('[DbClient] Bot is running on DBLess mode');
    return undefined;
  }
};
