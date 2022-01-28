import { Message as DiscordMessage } from 'discord.js';
import { inject, injectable } from 'inversify';

import env from '@config/env';
import Types from '@config/inversify-types';
import { Command, Event, Handler } from '@interfaces';

@injectable()
class MessageCreate implements Event {
  constructor(
    @inject(Types.CommandHandler)
    private readonly commandHandler: Handler<Command>,
  ) {}

  canProcess({ cleanContent, author, guild }: DiscordMessage): boolean {
    if (!cleanContent.startsWith(env.MESSAGE_PREFIX)) return false;

    if (author.bot) return false; // ignore bot messages

    if (!guild) return false; // ignore pms

    return true;
  }

  async process(message: DiscordMessage): Promise<void> {
    const { canProcess, commandHandler } = this;

    if (canProcess(message)) return;

    commandHandler.handle(message);
  }
}

export default MessageCreate;
