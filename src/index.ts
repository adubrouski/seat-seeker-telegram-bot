import chalk from 'chalk';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import appConfig from '../appconfig.json';
import { Telegraf, Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/src/core/types/typegram';
import { Hiding } from './models/telegraf.model';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const bot = new Telegraf(appConfig['API-KEY']);

bot.start(async (ctx) => {
  const test = [];

  for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
    const ggg = dayjs().set('date', i);
    test.push(ggg);
  }

  const keyboardMarkup = test.reduce((acc, item, index, array) => {
    try {
      if (index % 2) {
        acc.push([
          Markup.button.callback(
            item.format('D MMMM (dd)'),
            item.toISOString(),
          ),
          Markup.button.callback(
            array[index - 1].format('D MMMM (dd)'),
            array[index - 1].toISOString(),
          ),
        ]);
      }

      return acc;
    } catch (error) {
      console.log(error);
    }
  }, [] as any) as Hiding<InlineKeyboardButton>[][];

  ctx.reply('random example', Markup.inlineKeyboard(keyboardMarkup));
});

bot.action(
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
  (ctx) => {
    ctx.reply('ABOBA');
  },
);

bot.action('PREV_PAGE', (ctx) => {
  return ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('Coke', 'Coke')],
      [Markup.button.callback('Coke3333', 'Coke')],
      [Markup.button.callback('Coke', 'Coke')],
      [
        Markup.button.callback('\u{2B05}', 'PREV_PAGE'),
        Markup.button.callback('\u{27A1}', 'NEXT_PAGE'),
      ],
    ],
  });
});

bot.launch();

(async () => {
  try {
    // console.log(
    //   routes.map((item) => item.pointOfDeparture.date.format('HH:MM')),
    // );
    // console.log(routes);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.blackBright.bgRed.bold(error.message));
      console.log(chalk.red(error.stack));
    }
  }
})();
