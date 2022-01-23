import { Message as DiscordMessage } from 'discord.js';

import DiscordEventId from '@constants/discord-event-id';
import EventHandler from '@interfaces/event-handler';
import env from '@config/env';

class Message implements EventHandler<DiscordEventId.message> {
  readonly id = DiscordEventId.message;

  canHandle(message: DiscordMessage): boolean {
    if (!message.content.startsWith(env.MESSAGE_PREFIX)) return false;

    if (message.author.bot) return false; // ignore bot messages

    if (!message.guild) return false; // ignore pms

    return true;
  }

  async handle(message: DiscordMessage): Promise<void> {
    if (!this.canHandle(message)) return;

    message.channel.send('message received');
  }
}

export default Message;
