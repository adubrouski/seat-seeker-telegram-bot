import { StartController } from '../modules/start/start.controller';
import { TelegramRouter } from '../../lib/telegram-router';
import { CallbackQuery } from 'node-telegram-bot-api';

export const useStartRouter = (query: CallbackQuery) => {
  if (!query.data || !query.message) {
    return;
  }

  const router = new TelegramRouter(query.data);
  const startController = new StartController(query.message.chat.id, query.id);

  router.match('/start/user-existence', () => {
    startController.checkUserExistence(query.from.id, query.from.username!);
  });

  router.match('/start/initial-setup/departure-city-list', () => {
    startController.getDepartureCitiesKeyboard();
  });

  router.match(
    '/start/initial-setup/set-departure-city/:id',
    (parameters: any) => {
      startController.setDepartureCity(parameters.parameter.id);
    },
  );

  router.match(
    '/start/initial-setup/set-arrival-city/:id',
    (parameters: any) => {
      startController.setArrivalCity(parameters.parameter.id);
    },
  );
};
