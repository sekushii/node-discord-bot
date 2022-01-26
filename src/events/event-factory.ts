import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import { Event, Factory } from '@interfaces';
import EventType from '@constants/event-type';

@injectable()
class EventFactory implements Factory<Event> {
  constructor(
    @inject(Types.MessageCreate) private readonly messageCreate: Event,
    @inject(Types.Ready) private readonly ready: Event,
  ) {}

  getInstance(id: EventType): Event {
    switch (id) {
      case EventType.messageCreate:
        return this.messageCreate;

      case EventType.ready:
        return this.ready;

      default:
        throw new Error();
    }
  }
}

export default EventFactory;
