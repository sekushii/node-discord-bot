import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import env from '@config/env';
import EventHandler from '@modules/event-handler';

@injectable()
class Bot {
  constructor(
    @inject(Types.DiscordClient) private readonly client: Client,
    @inject(Types.EventHandler)
    private readonly eventForwarder: EventHandler,
  ) {}

  public start() {
    this.eventForwarder.init();
    this.client.login(env.DISCORD_BOT_TOKEN);
  }
}

export default Bot;
