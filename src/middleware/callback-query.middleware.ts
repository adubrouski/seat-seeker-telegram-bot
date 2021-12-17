import { CallbackQuery } from 'node-telegram-bot-api';
import { CityController } from '../modules/city/city.controller';
import { DateController } from '../modules/date/date.controller';

export const matchQueryController = async (query: CallbackQuery) => {
  if (!query.message || !query.data) {
    return;
  }

  const chatId = query.message.chat.id;
  const queryId = query.id;

  if (/\/city\/\d+/.test(query.data)) {
    const cityId = query.data.split('/')[1];
    await new CityController().getDatesKeyboard(chatId, queryId, cityId);
  }

  if (
    /\/date\/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)\?skip=\d+&take=\d+/.test(
      query.data,
    )
  ) {
    await new DateController().getTimesKeyboard(chatId, query.data);
  }
};
