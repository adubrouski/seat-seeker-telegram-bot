import { SettingsCityDTO } from './settings.dto';
import {
  ISettingsRepository,
  Settings,
} from '../../repositories/settings.repository';

interface ISettingsService {
  setArrivalCity(item: SettingsCityDTO): Promise<void>;
}

export class SettingsService implements ISettingsService {
  constructor(private settingsRepository: ISettingsRepository<Settings>) {}

  async setArrivalCity(item: SettingsCityDTO): Promise<void> {
    return this.settingsRepository.setArrivalCity(item);
  }
}
