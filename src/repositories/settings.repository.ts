import { BaseRepository } from './base.repository';
import { SettingsCityDTO } from '../modules/settings/settings.dto';

export interface ISettingsRepository<T> extends BaseRepository<T> {
  setArrivalCity(item: SettingsCityDTO): Promise<void>;
  setDepartureCity(item: SettingsCityDTO): Promise<void>;
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

  async setDepartureCity(item: SettingsCityDTO): Promise<void> {
    return this.qb.insert(item);
  }
}
