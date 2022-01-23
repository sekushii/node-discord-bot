import { Client, Message } from 'discord.js';

// import logger from '@modules/logger';
import Command from '@interfaces/command';
import env from '@config/env';
import * as Commands from '@commands';

export default class CommandHandler {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  handle(message: Message) {
    const parsedContent = this.parseContent(message.cleanContent);
    const command = this.commandFactory(parsedContent[0]);

    if (!command) return;

    command.execute(message, parsedContent);
  }

  parseContent(content: string): string[] {
    return content.trim().slice(env.MESSAGE_PREFIX.length).split(/\s+/g);
  }

  commandFactory(input: string): Command {
    if (!input) return null;

    let requestedCommand: Command;
    const allCommands = Object.values(Commands); // forces type-checking

    allCommands.forEach((command) => {
      if (command.patterns.some((pattern) => pattern.match(input))) {
        requestedCommand = new command(this.client);
      }
    });

    return requestedCommand;
  }
}
