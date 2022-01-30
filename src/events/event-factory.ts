import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import EventType from '@constants/event-type';
import { Event, Factory } from '@interfaces';
import { UnsupportedEventError } from 'errors';

@injectable()
class EventFactory implements Factory<Event> {
  constructor(
    @inject(Types.MessageCreate) private readonly messageCreate: Event,
    @inject(Types.Ready) private readonly ready: Event,
    @inject(Types.GuildCreate) private readonly guildCreate: Event,
    @inject(Types.GuildDelete) private readonly guildDelete: Event,
  ) {}

  getInstance(id: EventType): Event {
    switch (id) {
      case EventType.messageCreate:
        return this.messageCreate;

      case EventType.ready:
        return this.ready;

      case EventType.guildCreate:
        return this.guildCreate;

      case EventType.guildDelete:
        return this.guildDelete;

      default:
        throw new UnsupportedEventError(id);
    }
  }
}

export default EventFactory;
