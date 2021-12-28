import { StartController } from '../modules/start/start.controller';
import { TelegramRouter } from '../../lib/telegram-router';
import { CallbackQuery } from 'node-telegram-bot-api';

export const useStartRouter = (query: CallbackQuery) => {
  if (!query.data || !query.message) return;

  const router = new TelegramRouter(query.data);
  const startController = new StartController(query.message.chat.id, query.id);
  const editMessageOptions = {
    userName: query.from.username!,
    userId: query.from.id,
    messageId: query.message?.message_id!,
    chatId: query.message?.chat.id!,
  };

  router.match('/start/user-existence', () => {
    startController.checkUserExistence(editMessageOptions);
  });

  router.match('/start/initial-setup/departure-city-list', () => {
    startController.getDepartureCitiesKeyboard({
      chatId: query.message?.chat.id!,
      messageId: query.message?.message_id!,
    });
  });

  router.match(
    '/start/initial-setup/set-departure-city/:id',
    (parameters: any) => {
      startController.setDepartureCity({
        userId: query.from.id,
        cityId: parameters.parameter.id,
        messageId: query.message?.message_id!,
        chatId: query.message?.chat.id!,
      });
    },
  );

  router.match(
    '/start/initial-setup/set-arrival-city/:id',
    (parameters: any) => {
      startController.setArrivalCity({
        userId: query.from.id,
        cityId: parameters.parameter.id,
        messageId: query.message?.message_id!,
        chatId: query.message?.chat.id!,
      });
    },
  );
};
