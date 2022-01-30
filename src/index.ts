import 'reflect-metadata';
import Types from '@config/inversify-types';
import Bot from 'bot';
import container, { asyncDependencies } from './inversify.config';

(async () => {
  await container.loadAsync(asyncDependencies);

  container.get<Bot>(Types.Bot).start();
})();
