import * as Discord from 'discord.js';

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.DISCORD_BOT_TOKEN);
