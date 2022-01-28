import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import env from '@config/env';
import { DiscordClient, Event, Handler } from '@interfaces';

@injectable()
class Bot {
  constructor(
    @inject(Types.DiscordClient) private readonly client: DiscordClient,
    @inject(Types.EventHandler)
    private readonly eventHandler: Handler<Event>,
  ) {}

  public start() {
    this.eventHandler.handle();
    this.client.login(env.DISCORD_BOT_TOKEN);
  }
}

export default Bot;
