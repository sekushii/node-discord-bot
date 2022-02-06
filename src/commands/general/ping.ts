import { Message } from 'discord.js';
import { injectable } from 'inversify';

import { Command } from '@interfaces';
import { logger } from '@modules';
import { commandData } from 'decorators';

@commandData({
  decoratedName: 'Ping',
  decoratedDescription: "Responds with the bot's ping.",
  decoratedGuildOnly: true,
  decoratedArgsCount: 0,
  decoratedExamples: [],
})
@injectable()
class Ping implements Command {
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
      await message.channel.send(
        `Latency is ${message.createdTimestamp - Date.now()}ms`,
      );
    } catch (error) {
      logger.error(
        `[PingCommand] Could not execute command. Error: ${error.message}`,
      );
    }
  }
}

export default Ping;
