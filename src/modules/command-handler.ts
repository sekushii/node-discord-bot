import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import env from '@config/env';
import CommandFactory from '@commands/command-factory';

@injectable()
export default class CommandHandler {
  constructor(
    @inject(Types.CommandFactory)
    private readonly commandFactory: CommandFactory,
  ) {}

  handle(message: Message) {
    const parsedContent = this.parseContent(message.cleanContent);
    const command = this.commandFactory.getInstance(parsedContent[0]);

    if (!command) return;

    command.execute(message, parsedContent);
  }

  parseContent(content: string): string[] {
    return content.trim().slice(env.MESSAGE_PREFIX.length).split(/\s+/g);
  }
}
