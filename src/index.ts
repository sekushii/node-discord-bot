import 'reflect-metadata';
import Types from '@config/inversify-types';
import Bot from 'bot';
import container from './inversify.config';

container.get<Bot>(Types.Bot).start();
