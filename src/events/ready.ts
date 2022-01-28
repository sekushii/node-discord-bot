import { injectable } from 'inversify';

import { Event } from '@interfaces';
import { logger } from '@modules';

@injectable()
class Ready implements Event {
  canProcess(): boolean {
    return true;
  }

  async process(): Promise<void> {
    logger.info('[ReadyEvent] Bot is ready.');
  }
}

export default Ready;
