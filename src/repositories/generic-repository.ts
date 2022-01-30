import {
  Schema,
  Document,
  Model,
  SchemaDefinition,
  FilterQuery,
  SchemaOptions,
} from 'mongoose';
import { inject, injectable, unmanaged } from 'inversify';

import Types from '@config/inversify-types';
import { Repository, Query } from '@interfaces';
import DbClient from './db-client';

@injectable()
abstract class GenericRepository<TEntity, TModel extends Document>
  implements Repository<TEntity>
{
  private name: string;

  public isConnected: boolean;

  protected Model: Model<TModel>;

  public constructor(
    @inject(Types.DbClient) dbClient: DbClient,
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

    this.addMiddleware(schema);

    if (dbClient) {
      this.Model = dbClient.model<TModel>(this.name, schema);
    }
  }

  protected addMiddleware(schema: Schema) {
    schema.pre('save', function (next) {
      const document: TModel = this;

      if (document.id) {
        document._id = document.id; // eslint-disable-line no-underscore-dangle
        document.id = undefined;
      }

      next();
    });
  }

  public async findAll(): Promise<TEntity[]> {
    const records = await this.Model.find();

    return records.map((r) => this.readMapper(r));
  }

  public async findOne(query: Query<TEntity>): Promise<TEntity> {
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

    return records.map((r) => this.readMapper(r));
  }

  public async findManyByQuery(query: Query<TEntity>): Promise<TEntity[]> {
    const records = await this.Model.find(query as FilterQuery<TModel>);

    return records.map((r) => this.readMapper(r));
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
