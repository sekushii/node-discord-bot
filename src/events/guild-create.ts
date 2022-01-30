import { Guild } from 'discord.js';
import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import { Event, Repository } from '@interfaces';
import { Guild as GuildEntity } from '@models';
import { logger } from '@modules';

@injectable()
class GuildCreate implements Event {
  constructor(
    @inject(Types.GuildRepository)
    private readonly guildRepository: Repository<GuildEntity>,
  ) {}

  canProcess(): boolean {
    return true;
  }

  async process(guild: Guild): Promise<void> {
    const { id } = guild;
    logger.info(`[GuildCreateEvent] Joined guild: ${id}`);

    if (this.guildRepository.isConnected) {
      this.guildRepository.save({ id });
    }
  }
}

export default GuildCreate;
