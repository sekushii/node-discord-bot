import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';

import EventType from '@constants/event-type';
import EventHandler from '@interfaces/event-handler';
import CommandHandler from '@modules/command-handler';
import { Message } from '@events';

@injectable()
export default class EventForwarder {
  private client: Client;

  private commandHandler: CommandHandler;

  constructor(
    @inject(Types.DiscordClient) client: Client,
    @inject(Types.DiscordClient) commandHandler: CommandHandler,
  ) {
    this.client = client;
    this.commandHandler = commandHandler;
  }

  init() {
    this.listenToMessageEvents();
  }

  listenToMessageEvents() {
    this.client.on(EventType.message, (message) => {
      const handler = this.handlerFactory(EventType.message);
      handler.handle(message);
    });
  }

  handlerFactory(id: EventType): EventHandler<EventType> {
    switch (id) {
      case EventType.message:
        return new Message(this.commandHandler);

      default:
        throw new Error();
    }
  }
}
