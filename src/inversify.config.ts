import { Container } from 'inversify';
import { Client } from 'discord.js';
import Bot from 'bot';
import Types from '@config/inversify-types';
import EventForwarder from '@modules/event-forwarder';
import CommandHandler from '@modules/command-handler';

const container = new Container();

const discordClient = new Client();

container.bind<Client>(Types.DiscordClient).toConstantValue(discordClient);
container.bind<Bot>(Types.Bot).to(Bot).inSingletonScope();
container
  .bind<EventForwarder>(Types.EventForwarder)
  .to(EventForwarder)
  .inSingletonScope();
container
  .bind<CommandHandler>(Types.CommandHandler)
  .to(CommandHandler)
  .inSingletonScope();

export default container;
