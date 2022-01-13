import { BaseRepository } from './base.repository';
import { SettingsCityDTO } from '../modules/settings/settings.dto';

export interface ISettingsRepository<T> extends BaseRepository<T> {
  setArrivalCity(item: SettingsCityDTO): Promise<void>;
  setDepartureCity(item: Omit<T, 'arrival_city'>): Promise<void>;
}

export interface Settings {
  id: number;
  departure_city: string;
  arrival_city: string;
}

export class SettingsRepository
  extends BaseRepository<Settings>
  implements ISettingsRepository<Settings>
{
  async setArrivalCity(item: SettingsCityDTO): Promise<void> {
    return this.qb.insert(item);
  }

  setDepartureCity(item: Omit<Settings, 'arrival_city'>): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}
