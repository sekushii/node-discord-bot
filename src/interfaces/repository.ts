import { Guild } from '@models';

interface Repository<T> {
  readonly isConnected: boolean;
  save(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findManyById(ids: string[]): Promise<T[]>;
}

export default Repository;

export type GuildRepository = Repository<Guild>;
