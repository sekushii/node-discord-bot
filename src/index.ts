import 'dotenv/config';
import * as Discord from 'discord.js';
import 'module-alias/register';

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready1!');
});

client.login(process.env.DISCORD_BOT_TOKEN);
