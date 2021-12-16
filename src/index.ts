import TelegramBot from 'node-telegram-bot-api';
import appConfig from '../appconfig.json';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { StartController } from './modules/start/start.controller';
import { matchQueryController } from './middleware/callback-query.middleware';

export const bot = new TelegramBot(appConfig['API-KEY'], { polling: true });

dayjs.extend(localizedFormat);
dayjs.locale('ru');

// bot.onText(/\/start/, (msg) => {
//   const test = [];
//
//   for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
//     const ggg = dayjs().set('date', i);
//     test.push(ggg);
//   }
//
//   const keyboardMarkup = test.reduce(
//     (acc: InlineKeyboardButton[][], item, index, array) => {
//       if (index % 2) {
//         acc.push([
//           {
//             text: array[index - 1].format('D MMMM (dd)'),
//             callback_data: `/date/${array[index - 1].toISOString()}`,
//           },
//           {
//             text: item.format('D MMMM (dd)'),
//             callback_data: `/date/${item.toISOString()}`,
//           },
//         ]);
//       }
//
//       return acc;
//     },
//     [],
//   );
//
//   const opts = {
//     reply_markup: {
//       inline_keyboard: keyboardMarkup,
//     },
//   };
//
//   bot.sendMessage(msg.chat.id, 'Choose city', opts);
// });

bot.onText(/\/start/, StartController.getCitiesKeyboard);
bot.on('callback_query', matchQueryController);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == 'dog') {
    bot.sendMessage(chatId, "You sent 'dog'");
  }
});
