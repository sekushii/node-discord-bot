import { injectable } from 'inversify';

import logger from '@modules/logger';
import Event from '@interfaces/event';

@injectable()
class Ready implements Event {
  canProcess(): boolean {
    return true;
  }

  async process(): Promise<void> {
    logger.info('Ready!');
  }
}

export default Ready;
