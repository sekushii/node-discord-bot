import CommandId from '@constants/command-id';
import Command from '@interfaces/command';
import { Client, Message } from 'discord.js';

class Ping implements Command {
  id = CommandId.ping;

  client: Client;

  name = 'Ping';

  description = "Responds with the bot's ping.";

  static patterns = ['ping'];

  guildOnly = true;

  argsCount = 0;

  examples = [''];

  constructor(client: Client) {
    this.client = client;
  }

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
