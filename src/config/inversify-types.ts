const Types = {
  Bot: Symbol('Bot'),
  DiscordClient: Symbol('DiscordClient'),

  EventHandler: Symbol('EventHandler'),
  EventFactory: Symbol('EventFactory'),
  CommandHandler: Symbol('CommandHandler'),
  CommandFactory: Symbol('CommandFactory'),
  // events
  Ready: Symbol('Ready'),
  Message: Symbol('Message'),
  // commands
  Ping: Symbol('Ping'),
  Foo: Symbol('Foo'),
};

export default Types;
