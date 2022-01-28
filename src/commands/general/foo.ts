import { Message } from 'discord.js';
import { injectable } from 'inversify';

import { Command } from '@interfaces';
import { logger } from '@modules';

@injectable()
class Foo implements Command {
  name = 'Foo';

  description = "Responds with 'bar'.";

  guildOnly = true;

  argsCount = 0;

  examples = [''];

  canExecute(): boolean {
    return true;
  }

  async execute(message: Message): Promise<void> {
    if (!this.canExecute()) return;

    try {
      await message.channel.send('bar');
    } catch (error) {
      logger.error(
        `[FooCommand] Could not execute command. Error: ${error.message}`,
      );
    }
  }
}

export default Foo;
