import { BaseRepository } from './base.repository';

interface ISettingsRepository<T> {
  setArrivalCity(item: Omit<T, 'departure_city'>): Promise<void>;
  setDepartureCity(item: Omit<T, 'arrival_city'>): Promise<void>;
}

interface Settings {
  id: number;
  departure_city: string;
  arrival_city: string;
}

export class SettingsRepository
  extends BaseRepository<Settings>
  implements ISettingsRepository<Settings>
{
  setArrivalCity(item: Omit<Settings, 'departure_city'>): Promise<void> {
    return new Promise((resolve) => resolve());
  }

  setDepartureCity(item: Omit<Settings, 'arrival_city'>): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}
