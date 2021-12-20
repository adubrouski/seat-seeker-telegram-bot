import { CallbackQuery } from 'node-telegram-bot-api';
import { useStartRouter } from './start.router';

export const router = async (query: CallbackQuery) => {
  useStartRouter(query);
};
