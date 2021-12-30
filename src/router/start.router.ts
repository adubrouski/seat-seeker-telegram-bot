import { StartController } from '../modules/start/start.controller';
import { CallbackQuery } from 'node-telegram-bot-api';
import { queryDataParser } from '../../lib/query-data-parser';
import { StartAction } from '../models/start-controller.model';

export const useStartRouter = (query: CallbackQuery) => {
  if (!query.data || !query.message) return;

  const startController = new StartController();
  const editMessageOptions = {
    userName: query.from.username!,
    userId: query.from.id,
    messageId: query.message?.message_id!,
    chatId: query.message?.chat.id!,
  };

  const dataParser = queryDataParser(query.data);
  const action = dataParser.parseAction() as StartAction;

  switch (action) {
    case 'CHECK_USER_EXISTENCE':
      return startController.checkUserExistence(editMessageOptions);
    case 'GET_DEPARTURE_CITIES':
      return startController.getDepartureCitiesKeyboard({
        chatId: query.message?.chat.id!,
        messageId: query.message?.message_id!,
      });
    case 'SET_DEPARTURE_CITY': {
      const parameters = dataParser.parseParameters<{ id: string }>();

      return startController.setDepartureCity({
        userId: query.from.id,
        cityId: parameters.id,
        messageId: query.message?.message_id!,
        chatId: query.message?.chat.id!,
      });
    }
    case 'SET_ARRIVAL_CITY': {
      const parameters = dataParser.parseParameters<{ id: string }>();

      startController.setArrivalCity({
        userId: query.from.id,
        cityId: parameters.id,
        messageId: query.message?.message_id!,
        chatId: query.message?.chat.id!,
      });
    }
  }
};
