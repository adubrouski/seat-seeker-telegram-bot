import TelegramBot from 'node-telegram-bot-api';
import appConfig from '../appconfig.json';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { StartController } from './modules/start/start.controller';
import { matchQueryController } from './middleware/callback-query.middleware';
import { BotBuilder } from './builders/BotBuilder';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

(async () => {
  try {
    const bot = await new BotBuilder()
      .setApiToken(appConfig['API-KEY'])
      .setConfig({ polling: true })
      .build();

    bot.onText(/\/start/, new StartController().getCitiesKeyboard);
    bot.on('callback_query', matchQueryController);
  } catch (error) {
    process.exit(1);
  }
})();
