import { BaseRepository } from './base.repository';

export interface ICitiesRepository<T> extends BaseRepository<T> {
  isUserExist(item: Partial<T>): Promise<boolean>;
}

export interface City {
  city_id: string;
  city_name: string;
}

export class CitiesRepository
  extends BaseRepository<City>
  implements ICitiesRepository<City>
{
  public async isUserExist(item: Partial<City>): Promise<boolean> {
    const user = await this.findOne(item);
    console.log('USER', user);
    return !!user;
  }
}
