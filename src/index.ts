import appConfig from '../appconfig.json';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { StartController } from './modules/start/start.controller';
import { Bot } from './builders/Bot';
import { TelegramConnectionError } from './errors/HttpError';
import { routes } from './routes';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

(async () => {
  try {
    const bot = await new Bot(appConfig.API_KEY, appConfig.BOT_CONFIG).start();

    console.log(`BOT IS RUNNING`);

    bot.onText(new RegExp('/start'), (message) => {
      new StartController(message.chat.id, null).start();
    });
    bot.on('callback_query', routes);
  } catch (error) {
    if (error instanceof TelegramConnectionError) {
      console.log(error.details.status, error.details.statusText);
    } else {
      console.log('Unknown error');
    }
    process.exit(1);
  }
})();
