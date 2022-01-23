const enum DiscordEventId {
  ready = 'ready',
  message = 'message',
  error = 'error',
  warn = 'warn',
  disconnect = 'disconnect',
  reconnecting = 'reconnecting',
  guildCreate = 'guildCreate',
  guildDelete = 'guildDelete',
}

export default DiscordEventId;
