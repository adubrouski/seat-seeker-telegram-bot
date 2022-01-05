import { Controller } from '../controller';
import { SettingsService } from './settings.service';

interface CityDTO {
  userId: number;
  cityId: string;
}

interface ISettingsController {
  setArrivalCity(item: CityDTO): Promise<void>;
}

export class SettingsController
  extends Controller
  implements ISettingsController
{
  constructor(private settingsService: SettingsService) {
    super();
  }

  async setArrivalCity(item: CityDTO): Promise<void> {
    try {
      await this.settingsService.setArrivalCity(item);
    } catch (error) {
      console.log(error);
    }
  }
}
