const { NODE_ENV, DISCORD_BOT_TOKEN, DB_HOST, DB_NAME, MESSAGE_PREFIX } =
  process.env;

export default Object.freeze({
  NODE_ENV,
  DISCORD_BOT_TOKEN,
  DB_HOST,
  DB_NAME,
  MESSAGE_PREFIX,
});
