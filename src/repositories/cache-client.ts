import { logger } from '@modules';
import redis, { createClient } from 'redis';

type CacheClient = redis.RedisClientType<
  redis.RedisModules,
  redis.RedisScripts
>;

export default CacheClient;

export const getCacheClient = async (host: string): Promise<CacheClient> => {
  const client = createClient({
    url: `redis://${host}`,
  });

  try {
    await client.connect();
    logger.info('[CacheClient] Connected to cache store.');
  } catch (error) {
    logger.error('[CacheClient] Redis connection error: ', error);
    logger.info('[CacheClient] Bot is running without cache.');
  }

  logger.warn(client.isOpen);

  return client;
};
