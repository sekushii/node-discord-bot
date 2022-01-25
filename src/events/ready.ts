import { injectable } from 'inversify';

import logger from '@modules/logger';
import Event from '@interfaces/event';

@injectable()
class Ready implements Event {
  canHandle(): boolean {
    return true;
  }

  async handle(): Promise<void> {
    logger.info('Ready!');
  }
}

export default Ready;
