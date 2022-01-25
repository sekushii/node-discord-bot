import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import Event from '@interfaces/event';
import EventType from '@constants/event-type';
import { Message, Ready } from '.';

@injectable()
class EventFactory {
  constructor(
    @inject(Types.Message) private readonly message: Message,
    @inject(Types.Ready) private readonly ready: Ready,
  ) {}

  getInstance(id: EventType): Event {
    switch (id) {
      case EventType.message:
        return this.message;

      case EventType.ready:
        return this.ready;

      default:
        throw new Error();
    }
  }
}

export default EventFactory;
