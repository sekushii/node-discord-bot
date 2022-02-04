import { inject, injectable } from 'inversify';
import { Document } from 'mongoose';
import { GuildRepository as GuildRepositoryInterface } from '@interfaces';
import Types from '@config/inversify-types';
import { Guild } from '@models';
import DbClient from './db-client';
import GenericRepository from './generic-repository';
import CacheClient from './cache-client';

export interface GuildModel extends Guild, Document {
  id: string;
}

@injectable()
class GuildRepository
  extends GenericRepository<Guild, GuildModel>
  implements GuildRepositoryInterface
{
  public constructor(
    @inject(Types.DbClient) dbClient: DbClient,
    @inject(Types.CacheClient) cacheClient: CacheClient,
  ) {
    super(
      dbClient,
      cacheClient,
      'Guild',
      {
        _id: String,
        id: String,
      },
      {
        timestamps: true,
      },
    );
  }
}

export default GuildRepository;
