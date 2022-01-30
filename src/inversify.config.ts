import { AsyncContainerModule, Container } from 'inversify';
import Bot from 'bot';
import Types from '@config/inversify-types';
import EventHandler from '@modules/event-handler';
import { GuildCreate, GuildDelete, MessageCreate, Ready } from '@events';
import CommandFactory from '@commands/command-factory';
import CommandHandler from '@modules/command-handler';
import { Foo, Ping } from '@commands';
import EventFactory from '@events/event-factory';
import { DbClient, getDatabaseClient, GuildRepository } from '@repositories';
import { env } from './config';

const { Client, Intents } = require('discord.js');

const container = new Container();

const discordClient = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export const asyncDependencies = new AsyncContainerModule(async (bind) => {
  const dbClient = await getDatabaseClient(env.DB_HOST, env.DB_NAME);
  bind<DbClient>(Types.DbClient).toConstantValue(dbClient);
});

container
  .bind<typeof Client>(Types.DiscordClient)
  .toConstantValue(discordClient);
container.bind<Bot>(Types.Bot).to(Bot).inSingletonScope();

// factories
container
  .bind<EventFactory>(Types.EventFactory)
  .to(EventFactory)
  .inSingletonScope();
container
  .bind<CommandFactory>(Types.CommandFactory)
  .to(CommandFactory)
  .inSingletonScope();

// handlers
container
  .bind<EventHandler>(Types.EventHandler)
  .to(EventHandler)
  .inSingletonScope();
container
  .bind<CommandHandler>(Types.CommandHandler)
  .to(CommandHandler)
  .inSingletonScope();

// repos
container
  .bind<GuildRepository>(Types.GuildRepository)
  .to(GuildRepository)
  .inSingletonScope();

// events
container
  .bind<MessageCreate>(Types.MessageCreate)
  .to(MessageCreate)
  .inSingletonScope();
container.bind<Ready>(Types.Ready).to(Ready).inSingletonScope();
container
  .bind<GuildCreate>(Types.GuildCreate)
  .to(GuildCreate)
  .inSingletonScope();
container
  .bind<GuildDelete>(Types.GuildDelete)
  .to(GuildDelete)
  .inSingletonScope();

// commands
container.bind<Ping>(Types.Ping).to(Ping).inSingletonScope();
container.bind<Foo>(Types.Foo).to(Foo).inSingletonScope();

export default container;
