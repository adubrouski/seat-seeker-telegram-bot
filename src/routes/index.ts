import { CallbackQuery } from 'node-telegram-bot-api';
import { useStartRoutes } from './start.routes';

export const routes = async (query: CallbackQuery) => {
  if (!query.message || !query.data) {
    return;
  }

  const chatId = query.message.chat.id;
  const queryId = query.id;

  useStartRoutes(query.data, chatId, queryId);
};
