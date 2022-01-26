import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';

import Types from '@config/inversify-types';
import env from '@config/env';
import { Factory, Command, Handler } from '@interfaces';

@injectable()
export default class CommandHandler implements Handler<Command> {
  constructor(
    @inject(Types.CommandFactory)
    private readonly factory: Factory<Command>,
  ) {}

  getFactory(): Factory<Command> {
    return this.factory;
  }

  handle(message: Message) {
    const parsedContent = this.parseContent(message.cleanContent);
    const command = this.factory.getInstance(parsedContent[0]);

    if (!command) return;

    command.execute(message, parsedContent);
  }

  parseContent(content: string): string[] {
    return content.trim().slice(env.MESSAGE_PREFIX.length).split(/\s+/g);
  }
}
