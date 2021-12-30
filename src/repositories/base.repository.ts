import { Knex } from 'knex';
import { DatabaseConnection } from '../connections/database.connection';

interface IBaseRepository<T> {
  find(item: Partial<T>): Promise<T[]>;
  findOne(item: Partial<T>): Promise<T | undefined>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected knex: Knex;
  constructor(protected tableName: string) {
    this.knex = DatabaseConnection.connection;
  }

  public get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  public find(item: Partial<T>): Promise<T[]> {
    return this.qb.where(item).select();
  }

  public findAll(): Promise<T[]> {
    return this.qb.select();
  }

  public findOne(item: Partial<T>): Promise<T | undefined> {
    return this.qb.where(item).first();
  }
}
