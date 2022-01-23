import { Message as DiscordMessage } from 'discord.js';

import EventType from '@constants/event-type';
import EventHandler from '@interfaces/event-handler';
import CommandHandler from '@modules/command-handler';
import env from '@config/env';

class Message implements EventHandler<EventType.message> {
  readonly id = EventType.message;

  private commandHandler: CommandHandler;

  constructor(commandHandler) {
    this.commandHandler = commandHandler;
  }

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
