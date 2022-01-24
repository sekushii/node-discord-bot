import { Client } from 'discord.js';
import { inject, injectable } from 'inversify';
import Types from '@config/inversify-types';
import logger from '@modules/logger';
import env from '@config/env';
import EventForwarder from '@modules/event-forwarder';

@injectable()
class Bot {
  private client: Client;

  private eventForwarder: EventForwarder;

  constructor(
    @inject(Types.DiscordClient) client: Client,
    @inject(Types.EventForwarder) eventForwarder: EventForwarder,
  ) {
    this.client = client;
    this.eventForwarder = eventForwarder;
  }

  public start() {
    this.eventForwarder.init();
    this.client.login(env.DISCORD_BOT_TOKEN);

    this.client.once('ready', () => {
      logger.info('Ready!');
    });
  }
}

export default Bot;
