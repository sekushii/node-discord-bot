import { Message } from 'discord.js';
import { inject, injectable } from 'inversify';

import { Command, HttpClient } from '@interfaces';
import { logger } from '@modules';
import { commandData } from 'decorators';
import { BooruResponse } from '@dtos';
import Types from '@config/inversify-types';
import env from '@config/env';

@commandData({
  decoratedName: 'RandomImageByTag',
  decoratedDescription: 'Fetches a random image by tag from safebooru.',
  decoratedGuildOnly: true,
  decoratedArgsCount: 1,
  decoratedExamples: [],
})
@injectable()
class RandomImageByTag implements Command {
  name: string;

  description: string;

  guildOnly: boolean;

  argsCount: number;

  examples: string[];

  booruClient: HttpClient;

  constructor(@inject(Types.BooruClient) safebooruClient: HttpClient) {
    this.booruClient = safebooruClient;
  }

  canExecute(message: Message, parsedContent: string[]): boolean {
    return parsedContent.length >= this.argsCount && !!env.BOORU_URL;
  }

  async execute(message: Message, parsedContent: string[]): Promise<void> {
    if (!this.canExecute(message, parsedContent)) return;

    try {
      const { data = [] }: { data: BooruResponse[] } =
        await this.booruClient.get('/index.php', {
          params: {
            tags: `${parsedContent[0]} rating:safe`,
          },
        });

      const randomImage = data[Math.floor(Math.random() * data.length)];

      await message.channel.send(
        `${env.BOORU_URL}/images/${randomImage.directory}/${randomImage.image}`,
      );
    } catch (error) {
      logger.error(
        `[RandomImageByTagCommand] Could not execute command. Error: ${error}`,
      );
      message.channel.send('An error ocurred. Please try again.');
    }
  }
}

export default RandomImageByTag;
