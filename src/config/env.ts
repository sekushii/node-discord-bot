const {
  NODE_ENV,
  DISCORD_BOT_TOKEN,
  MESSAGE_PREFIX,
  DB_HOST,
  DB_NAME,
  DB_CONN_TIMEOUT,
  CACHE_HOST,
  CACHE_DEFAULT_TTL,
} = process.env;

export default Object.freeze({
  NODE_ENV,
  DISCORD_BOT_TOKEN,
  DB_HOST,
  DB_NAME,
  DB_CONN_TIMEOUT,
  MESSAGE_PREFIX,
  CACHE_HOST,
  CACHE_DEFAULT_TTL,
});
