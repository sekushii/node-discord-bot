import { Message as DiscordMessage } from 'discord.js';
import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import Event from '@interfaces/event';
import CommandHandler from '@modules/command-handler';
import env from '@config/env';

@injectable()
class Message implements Event {
  constructor(
    @inject(Types.CommandHandler)
    private readonly commandHandler: CommandHandler,
  ) {}

  canHandle(message: DiscordMessage): boolean {
    if (!message.content.startsWith(env.MESSAGE_PREFIX)) return false;

    if (message.author.bot) return false; // ignore bot messages

    if (!message.guild) return false; // ignore pms

    return true;
  }

  async handle(message: DiscordMessage): Promise<void> {
    if (!this.canHandle(message)) return;

    this.commandHandler.handle(message);
  }
}

export default Message;
