import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import Event from '@interfaces/event';
import EventType from '@constants/event-type';
import { MessageCreate, Ready } from '.';

@injectable()
class EventFactory {
  constructor(
    @inject(Types.MessageCreate) private readonly messageCreate: MessageCreate,
    @inject(Types.Ready) private readonly ready: Ready,
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
