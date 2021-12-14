import TelegramBot from 'node-telegram-bot-api';
import appConfig from '../appconfig.json';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { InlineKeyboardButton } from './models/telegraf.model';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const bot = new TelegramBot(appConfig['API-KEY'], { polling: true });

dayjs.extend(localizedFormat);
dayjs.locale('ru');

bot.onText(/\/start/, (msg) => {
  const test = [];

  for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
    const ggg = dayjs().set('date', i);
    test.push(ggg);
  }

  const keyboardMarkup = test.reduce(
    (acc: InlineKeyboardButton[][], item, index, array) => {
      if (index % 2) {
        acc.push([
          {
            text: array[index - 1].format('D MMMM (dd)'),
            callback_data: `/date/${array[index - 1].toISOString()}`,
          },
          {
            text: item.format('D MMMM (dd)'),
            callback_data: `/date/${item.toISOString()}`,
          },
        ]);
      }

      return acc;
    },
    [],
  );

  const opts = {
    reply_markup: {
      inline_keyboard: keyboardMarkup,
    },
  };

  bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == 'dog') {
    bot.sendMessage(chatId, "You sent 'dog'");
  }
});

// import chalk from 'chalk';
// import 'dayjs/locale/ru';
// import dayjs from 'dayjs';
//
// import localizedFormat from 'dayjs/plugin/localizedFormat';

// import { Telegraf, Markup } from 'telegraf';
// import {
//   Hiding,
//   InlineKeyboardButton,
//   TelegrafUpdateField,
// } from './models/telegraf.model';
// import { getHtmlContent } from './queries/html.query';
// import { htmlParser } from '../lib/html-parser';
// import { DateController } from './controllers/date.controller';
//
// dayjs.extend(localizedFormat);
// dayjs.locale('ru');
//
// const bot = new Telegraf(appConfig['API-KEY']);
//
// bot.start(async (ctx) => {
//   const test = [];
//
//   for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
//     const ggg = dayjs().set('date', i);
//     test.push(ggg);
//   }
//
//   const keyboardMarkup = test.reduce(
//     (acc: Hiding<InlineKeyboardButton>[][], item, index, array) => {
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
//   ctx.reply('random example', Markup.inlineKeyboard(keyboardMarkup));
// });
//
// bot.action(
//   /\/date\/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
//   DateController.getTimeListByDate,
// );
//
// bot.action(
//   /\[TIME]\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
//   (ctx) => {
//     const test = ctx.update.callback_query;
//     const newCtx = ctx.update as TelegrafUpdateField;
//
//     console.log(ctx.match);
//     if (test) {
//       ctx.reply(newCtx.callback_query.data);
//     }
//
//     ctx.answerCbQuery('');
//   },
// );
//
// bot.launch();
//
// (async () => {
//   try {
//     // console.log(
//     //   routes.map((item) => item.pointOfDeparture.date.format('HH:MM')),
//     // );
//     // console.log(routes);
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(chalk.blackBright.bgRed.bold(error.message));
//       console.log(chalk.red(error.stack));
//     }
//   }
// })();
