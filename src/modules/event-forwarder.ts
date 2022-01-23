import { Client } from 'discord.js';

import DiscordEventId from '@constants/discord-event-id';
import EventHandler from '@interfaces/event-handler';
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
    this.client.on(DiscordEventId.message, (message) => {
      const handler = this.handlerFactory(DiscordEventId.message);
      handler.handle(message);
    });
  }

  handlerFactory(id: DiscordEventId): EventHandler<DiscordEventId> {
    switch (id) {
      case DiscordEventId.message:
        return new Events.Message();

      default:
        throw new Error();
    }
  }
}
