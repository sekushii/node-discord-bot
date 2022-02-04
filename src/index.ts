import 'reflect-metadata';
import Types from '@config/inversify-types';
import Bot from 'bot';
import container, { dbDependency, cacheDependency } from './inversify.config';

(async () => {
  await container.loadAsync(dbDependency);
  await container.loadAsync(cacheDependency);

  container.get<Bot>(Types.Bot).start();
})();
