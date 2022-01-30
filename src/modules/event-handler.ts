import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import EventType from '@constants/event-type';
import { DiscordClient, Event, Factory, Handler } from '@interfaces';
import logger from './logger';

@injectable()
export default class EventHandler implements Handler<Event> {
  constructor(
    @inject(Types.DiscordClient) private readonly client: DiscordClient,
    @inject(Types.EventFactory) private readonly factory: Factory<Event>,
  ) {}

  getFactory(): Factory<Event> {
    return this.factory;
  }

  handle() {
    this.listenToMessageCreateEvent();
    this.listenToReadyEvent();
    this.listenToGuildCreateEvent();
    this.listenToGuildDeleteEvent();
  }

  private logListener(id: EventType) {
    logger.info(`[EventHandler] Listening to '${id}' events.`);
  }

  private listenToMessageCreateEvent() {
    this.logListener(EventType.messageCreate);

    this.client.on(EventType.messageCreate, (message) => {
      const event = this.factory.getInstance(EventType.messageCreate);

      event.process(message);
    });
  }

  private listenToReadyEvent() {
    this.logListener(EventType.ready);

    this.client.once(EventType.ready, () => {
      const event = this.factory.getInstance(EventType.ready);

      event.process();
    });
  }

  private listenToGuildCreateEvent() {
    this.logListener(EventType.guildCreate);

    this.client.on(EventType.guildCreate, (guild) => {
      const event = this.factory.getInstance(EventType.guildCreate);

      event.process(guild);
    });
  }

  private listenToGuildDeleteEvent() {
    this.logListener(EventType.guildDelete);

    this.client.on(EventType.guildDelete, (guild) => {
      const event = this.factory.getInstance(EventType.guildDelete);

      event.process(guild);
    });
  }
}
