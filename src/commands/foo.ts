import CommandId from '@constants/command-id';
import Command from '@interfaces/command';
import { Client, Message } from 'discord.js';

class Foo implements Command {
  id = CommandId.foo;

  client: Client;

  name = 'Foo';

  description = "Responds with 'bar'.";

  static patterns = ['foo'];

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
      await message.channel.send('bar');
    } catch (error) {
      console.error(`Could not execute command. Error: ${error.message}`);
    }
  }
}

export default Foo;
