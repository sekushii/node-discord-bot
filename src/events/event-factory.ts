import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import EventType from '@constants/event-type';
import { Event, Factory } from '@interfaces';
import { logger } from '@modules';

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
        logger.debug(
          `[EventFactory][getInstance] No matching event for id: ${id}`,
        );
        return null;
    }
  }
}

export default EventFactory;
