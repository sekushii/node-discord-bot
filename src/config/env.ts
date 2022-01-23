const { NODE_ENV, DISCORD_BOT_TOKEN, DB_HOST, DB_NAME, MESSAGE_PREFIX } =
  process.env;

const env = {
  NODE_ENV,
  DISCORD_BOT_TOKEN,
  DB_HOST,
  DB_NAME,
  MESSAGE_PREFIX,
};

export default env;
