import { Client } from 'discord.js';

import EventType from '@constants/event-type';
import EventHandler from '@interfaces/event-handler';
import CommandHandler from '@modules/command-handler';
import * as Events from '@events';

export default class EventForwarder {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
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
        return new Events.Message(new CommandHandler(this.client));

      default:
        throw new Error();
    }
  }
}
