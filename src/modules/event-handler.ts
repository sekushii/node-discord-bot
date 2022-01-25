import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import EventType from '@constants/event-type';
import EventFactory from '@events/event-factory';

@injectable()
export default class EventHandler {
  constructor(
    @inject(Types.DiscordClient) private readonly client: Client,
    @inject(Types.EventFactory) private readonly eventFactory: EventFactory,
  ) {}

  init() {
    this.listenToMessageCreateEvent();
    this.listenToReadyEvent();
  }

  listenToMessageCreateEvent() {
    this.client.on(EventType.messageCreate, (message) => {
      const handler = this.eventFactory.getInstance(EventType.messageCreate);

      handler.handle(message);
    });
  }

  listenToReadyEvent() {
    this.client.once(EventType.ready, () => {
      const handler = this.eventFactory.getInstance(EventType.ready);
      handler.handle();
    });
  }
}
