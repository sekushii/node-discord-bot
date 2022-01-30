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
    const event = this.factory.getInstance(EventType.messageCreate);
    this.logListener(EventType.messageCreate);

    this.client.on(EventType.messageCreate, (message) =>
      event.process(message),
    );
  }

  private listenToReadyEvent() {
    const event = this.factory.getInstance(EventType.ready);
    this.logListener(EventType.ready);

    this.client.once(EventType.ready, () => event.process());
  }

  private listenToGuildCreateEvent() {
    const event = this.factory.getInstance(EventType.guildCreate);
    this.logListener(EventType.guildCreate);

    this.client.on(EventType.guildCreate, (guild) => event.process(guild));
  }

  private listenToGuildDeleteEvent() {
    const event = this.factory.getInstance(EventType.guildDelete);
    this.logListener(EventType.guildDelete);

    this.client.on(EventType.guildDelete, (guild) => event.process(guild));
  }
}
