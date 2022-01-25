import Command from '@interfaces/command';
import { Message } from 'discord.js';
import { injectable } from 'inversify';

@injectable()
class Ping implements Command {
  name = 'Ping';

  description = "Responds with the bot's ping.";

  guildOnly = true;

  argsCount = 0;

  examples = [''];

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
      console.error(`Could not execute command. Error: ${error.message}`);
    }
  }
}

export default Ping;
