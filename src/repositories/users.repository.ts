import { BaseRepository } from './base.repository';

export interface IUsersRepository<T> {
  isUserExist(item: Partial<T>): Promise<boolean>;
}

export interface User {
  id: number;
  username: string;
}

export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository<User>
{
  public async isUserExist(item: Partial<User>): Promise<boolean> {
    const user = this.findOne(item);

    return !!user;
  }
}
