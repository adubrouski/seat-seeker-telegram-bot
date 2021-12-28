import { Knex } from 'knex';

interface IUsersRepository {
  findById(userId: number): any;
}

export class UsersRepository implements IUsersRepository {
  constructor(private qb: Knex, private tableName: string) {}

  async findById(userId: number) {
    return this.qb(this.tableName).where({ id: userId }).select();
  }
}
