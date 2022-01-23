import * as Discord from 'discord.js';

import env from '@config/env';
import logger from '@modules/logger';
import EventForwarder from '@modules/event-forwarder';

const client = new Discord.Client();

client.once('ready', () => {
  logger.info('Ready!');

  const eventForwarder = new EventForwarder(client);

  eventForwarder.init();
});

client.login(env.DISCORD_BOT_TOKEN);
