import { Container } from 'inversify';
import { Client } from 'discord.js';
import Bot from 'bot';
import Types from '@config/inversify-types';
import EventHandler from '@modules/event-handler';
import { Message, Ready } from '@events';
import CommandFactory from '@commands/command-factory';
import CommandHandler from '@modules/command-handler';
import { Foo, Ping } from '@commands';
import EventFactory from '@events/event-factory';

const container = new Container();

const discordClient = new Client();

container.bind<Client>(Types.DiscordClient).toConstantValue(discordClient);
container.bind<Bot>(Types.Bot).to(Bot).inSingletonScope();
container
  .bind<EventFactory>(Types.EventFactory)
  .to(EventFactory)
  .inSingletonScope();
container
  .bind<EventHandler>(Types.EventHandler)
  .to(EventHandler)
  .inSingletonScope();
container
  .bind<CommandFactory>(Types.CommandFactory)
  .to(CommandFactory)
  .inSingletonScope();
container
  .bind<CommandHandler>(Types.CommandHandler)
  .to(CommandHandler)
  .inSingletonScope();

// events
container.bind<Message>(Types.Message).to(Message).inSingletonScope();
container.bind<Ready>(Types.Ready).to(Ready).inSingletonScope();

// commands
container.bind<Ping>(Types.Ping).to(Ping).inSingletonScope();
container.bind<Foo>(Types.Foo).to(Foo).inSingletonScope();

export default container;
