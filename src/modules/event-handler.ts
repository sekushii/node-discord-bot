import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import EventType from '@constants/event-type';
import { DiscordClient, Event, Factory, Handler } from '@interfaces';

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
  }

  listenToMessageCreateEvent() {
    this.client.on(EventType.messageCreate, (message) => {
      const event = this.factory.getInstance(EventType.messageCreate);

      event.process(message);
    });
  }

  listenToReadyEvent() {
    this.client.once(EventType.ready, () => {
      const event = this.factory.getInstance(EventType.ready);

      event.process();
    });
  }
}
