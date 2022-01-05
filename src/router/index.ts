import { CallbackQuery } from 'node-telegram-bot-api';
import { useStartRouter } from './start.router';
import { queryDataParser } from '../../lib/query-data-parser';
import { useSettingsRouters } from './settings.router';

export const router = async (query: CallbackQuery) => {
  if (!query.data || !query.message) return;

  if (queryDataParser(query.data).parseController() === 'start') {
    useStartRouter(query);
    useSettingsRouters(query);
  }
};
