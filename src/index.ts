import TelegramBot from 'node-telegram-bot-api';
import appConfig from '../appconfig.json';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { StartController } from './modules/start/start.controller';
import { matchQueryController } from './middleware/callback-query.middleware';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

export const bot = new TelegramBot(appConfig['API-KEY'], { polling: true });

bot.onText(/\/start/, StartController.getCitiesKeyboard);
bot.on('callback_query', matchQueryController);
