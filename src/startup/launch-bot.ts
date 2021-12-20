import { Bot } from '../builders/Bot';
import { StartController } from '../modules/start/start.controller';
import { router } from '../router';
import TelegramBot from 'node-telegram-bot-api';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { TelegramConnectionError } from '../errors/telegram-connection-error';

export const launchBot = async (
  apiToken: string,
  config: TelegramBot.ConstructorOptions,
) => {
  try {
    dayjs.extend(localizedFormat);
    dayjs.locale('ru');

    const START_REGEXP = new RegExp('/start');
    const bot = await new Bot(apiToken, config).start();
    console.log(`BOT IS RUNNING`);

    bot.onText(START_REGEXP, (message) => {
      new StartController(message.chat.id, null).start();
    });
    bot.on('callback_query', router);
  } catch (error) {
    if (error instanceof TelegramConnectionError) {
      console.log(error.details.status, error.details.statusText);
    } else {
      console.log('Unknown error');
    }
    process.exit(1);
  }
};
