import { CallbackQuery } from 'node-telegram-bot-api';
import { queryDataParser } from '../../lib/query-data-parser';
import { StartAction } from '../models/start-controller.model';
import { SettingsController } from '../modules/settings/settings.controller';
import { SettingsRepository } from '../repositories/settings.repository';
import { SettingsService } from '../modules/settings/settings.service';

export const useSettingsRouters = (query: CallbackQuery) => {
  if (!query.data || !query.message) return;

  const settingsController = new SettingsController(
    new SettingsService(new SettingsRepository('settings')),
  );

  const dataParser = queryDataParser(query.data);
  const action = dataParser.parseAction() as StartAction;

  switch (action) {
    case 'SET_DEPARTURE_CITY': {
      const parameters = dataParser.parseParameters<{ id: string }>();

      settingsController.setArrivalCity({
        userId: query.from.id,
        cityId: parameters.id,
      });
    }
  }
};
