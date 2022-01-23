interface EventHandler<DiscordEventId> {
  id: DiscordEventId;
  canHandle(...args: unknown[]): boolean;
  handle(...args: unknown[]): void;
}

export default EventHandler;
