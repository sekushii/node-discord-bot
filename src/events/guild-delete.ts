import { Guild } from 'discord.js';
import { injectable } from 'inversify';

import { Event } from '@interfaces';
import { logger } from '@modules';

@injectable()
class GuildDelete implements Event {
  canProcess(): boolean {
    return true;
  }

  async process(guild: Guild): Promise<void> {
    logger.info(`[GuildDeleteEvent] Left guild: ${guild.id}`);
  }
}

export default GuildDelete;
