import { BaseRepository } from './base.repository';

export interface ICitiesRepository<T> {
  isUserExist(item: Partial<T>): Promise<boolean>;
}

export interface City {
  id: string;
  name: string;
}

export class CitiesRepository
  extends BaseRepository<City>
  implements ICitiesRepository<City>
{
  public async isUserExist(item: Partial<City>): Promise<boolean> {
    const user = this.findOne(item);

    return !!user;
  }
}
