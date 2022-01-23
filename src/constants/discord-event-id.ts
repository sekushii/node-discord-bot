const enum DiscordEventId {
  READY = 'ready',
  MESSAGE = 'message',
  MESSAGE_UPDATE = 'messageUpdate',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
  DISCONNECT = 'disconnect',
  RECONNECTING = 'reconnecting',
  GUILD_CREATE = 'guildCreate',
  GUILD_DELETE = 'guildDelete',
  CHANNEL_CREATE = 'channelCreate',
  CHANNEL_DELETE = 'channelDelete',
}

export default DiscordEventId;
