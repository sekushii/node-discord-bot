import * as Discord from 'discord.js';
import logger from '@modules/logger';

const client = new Discord.Client();

client.once('ready', () => {
  logger.info('Ready!');
});

client.login(process.env.DISCORD_BOT_TOKEN);
