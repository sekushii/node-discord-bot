import { Message } from 'discord.js';
import { injectable } from 'inversify';

import { Command } from '@interfaces';
import { logger } from '@modules';
import { commandData } from 'decorators';

@commandData({
  decoratedName: 'Foo',
  decoratedDescription: "Responds with 'bar'.",
  decoratedGuildOnly: true,
  decoratedArgsCount: 0,
  decoratedExamples: [],
})
@injectable()
class Foo implements Command {
  name: string;

  description: string;

  guildOnly: boolean;

  argsCount: number;

  examples: string[];

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
