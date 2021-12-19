import { StartController } from '../modules/start/start.controller';
import { Router } from '../../lib/router';

export const useStartRoutes = (
  path: string,
  chatId: number,
  queryId: string,
) => {
  const router = new Router(path);
  const startController = new StartController(chatId, queryId);

  router.match('/start/user-existence', () => {
    startController.checkUserExistence(123);
  });

  router.match('/start/initial-setup/departure-city-list', () => {
    startController.getDepartureCitiesKeyboard();
  });

  router.match('/start/initial-setup/set-departure-city/:id', () => {
    startController.setDepartureCity();
  });

  router.match('/start/initial-setup/set-arrival-city/:id', () => {
    startController.setArrivalCity();
  });
};
