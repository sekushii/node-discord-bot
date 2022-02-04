import {
  Schema,
  Document,
  Model,
  SchemaDefinition,
  FilterQuery,
  SchemaOptions,
  Query,
} from 'mongoose';
import { inject, injectable, unmanaged } from 'inversify';

import Types from '@config/inversify-types';
import { Repository, Query as CustomQuery } from '@interfaces';
import env from '@config/env';
import DbClient from './db-client';
import CacheClient from './cache-client';

@injectable()
abstract class GenericRepository<TEntity, TModel extends Document>
  implements Repository<TEntity>
{
  private name: string;

  public isConnected: boolean;

  protected Model: Model<TModel>;

  public constructor(
    @inject(Types.DbClient) dbClient: DbClient,
    @inject(Types.CacheClient) cacheClient: CacheClient,
    @unmanaged() name: string,
    @unmanaged() schemaDefinition: SchemaDefinition,
    @unmanaged() schemaOptions: SchemaOptions,
  ) {
    this.name = name;
    this.isConnected = !!dbClient;

    const schema = new Schema(schemaDefinition, {
      collection: this.name,
      ...schemaOptions,
    });

    if (dbClient) {
      this.addPreSaveMiddleware(schema);
      this.Model = dbClient.model<TModel>(this.name, schema);
    }

    if (cacheClient) {
      this.addCacheLayer(cacheClient);
    }
  }

  /**
   * Writes "id" property value, when present, to mongodb's "_id" property when saving.
   *
   * @param schema mongoose schema
   */
  protected addPreSaveMiddleware(schema: Schema) {
    schema.pre('save', function (next) {
      const document: TModel = this;

      if (document.id) {
        document._id = document.id; // eslint-disable-line no-underscore-dangle
        document.id = undefined;
      }

      next();
    });
  }

  /**
   * Creates a chainable cache function. e.g.: Model.find({}).cache(null, 600)
   * Overrides moongoose's exec behavior to include caching of results
   *
   * @param cacheClient cache client
   */
  protected addCacheLayer(cacheClient: CacheClient) {
    const { exec } = Query.prototype;

    // a hash key input it allows for more granularity
    Query.prototype.cache = function (
      key,
      time = Number(env.CACHE_DEFAULT_TTL),
    ) {
      this.useCache = true;
      this.time = time;
      this.hashKey = key || this.mongooseCollection.name;

      return this;
    };

    Query.prototype.exec = async function (...args) {
      if (!cacheClient.isOpen) return exec.apply(this, args);

      const collectionName = this.mongooseCollection.name;

      if (this.useCache) {
        const key = JSON.stringify({
          ...this.getOptions(),
          collectionName,
          op: this.op,
        });

        const cachedResults = await cacheClient.hGet(this.hashKey, key);

        if (cachedResults) {
          const result = JSON.parse(cachedResults);
          return result;
        }

        const result = await exec.apply(this, args);

        cacheClient.hSet(this.hashKey, key, JSON.stringify(result));
        cacheClient.expire(this.hashKey, this.time);

        return result;
      }

      if (
        !['find', 'findById', 'findOne'].includes(this.op) &&
        (await cacheClient.exists(this.hashKey))
      ) {
        cacheClient.del(this.hashKey);
      }

      return exec.apply(this, args);
    };
  }

  public async findAll(): Promise<TEntity[]> {
    const records = await this.Model.find();

    return records.map(this.readMapper);
  }

  public async findOne(query: CustomQuery<TEntity>): Promise<TEntity> {
    const record = await this.Model.findOne(query as FilterQuery<TModel>);

    return this.readMapper(record);
  }

  public async findById(id: string): Promise<TEntity> {
    const record = await this.Model.findById(id);

    return this.readMapper(record);
  }

  public async save(doc: TEntity): Promise<TEntity> {
    const instance = new this.Model(doc);

    const record = await instance.save();

    return this.readMapper(record);
  }

  public async findManyById(ids: string[]): Promise<TEntity[]> {
    const records = await this.Model.where('_id').in(ids);

    return records.map(this.readMapper);
  }

  public async findManyByQuery(
    query: CustomQuery<TEntity>,
  ): Promise<TEntity[]> {
    const records = await this.Model.find(query as FilterQuery<TModel>);

    return records.map(this.readMapper);
  }

  private readMapper(model: TModel) {
    const obj = model.toJSON();
    Object.defineProperty(
      obj,
      'id',
      Object.getOwnPropertyDescriptor(obj, '_id') as string,
    );
    delete obj._id; // eslint-disable-line no-underscore-dangle
    delete obj.__v; // eslint-disable-line no-underscore-dangle
    return obj as unknown as TEntity;
  }
}

export default GenericRepository;
