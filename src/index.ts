import chalk from 'chalk';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import appConfig from '../appconfig.json';
import { Telegraf, Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/src/core/types/typegram';
import { Hiding } from './models/telegraf.model';
import { getHtmlContent } from './queries/html.query';
import { htmlParser } from '../lib/html-parser';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

const bot = new Telegraf(appConfig['API-KEY']);

bot.start(async (ctx) => {
  const test = [];

  for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
    const ggg = dayjs().set('date', i);
    test.push(ggg);
  }

  const keyboardMarkup = test.reduce(
    (acc: Hiding<InlineKeyboardButton>[][], item, index, array) => {
      if (index % 2) {
        acc.push([
          {
            text: array[index - 1].format('D MMMM (dd)'),
            callback_data: `[DATE]${array[index - 1].toISOString()}`,
          },
          {
            text: item.format('D MMMM (dd)'),
            callback_data: `[DATE]${item.toISOString()}`,
          },
        ]);
      }

      return acc;
    },
    [],
  );

  ctx.reply('random example', Markup.inlineKeyboard(keyboardMarkup));
});

bot.action(
  /\[DATE]\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
  async (ctx) => {
    const rr = await getHtmlContent();
    const test = htmlParser(rr).parse();

    const keyboardMarkup = test.reduce(
      (acc: Hiding<InlineKeyboardButton>[][], item, index, array) => {
        if (index % 2) {
          acc.push([
            {
              text: array[index - 1].pointOfDeparture.date.format('HH:mm'),
              callback_data: `[TIME]${array[
                index - 1
              ].pointOfDeparture.date.toISOString()}`,
            },
            {
              text: item.pointOfDeparture.date.format('HH:mm'),
              callback_data: `[TIME]${item.pointOfDeparture.date.toISOString()}`,
            },
          ]);
        }

        return acc;
      },
      [],
    );

    ctx.reply('random example', Markup.inlineKeyboard(keyboardMarkup));
  },
);

bot.action(
  /\[TIME]\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
  (ctx) => {
    //@ts-ignore
    const test = ctx.update.callback_query.data;
    if (test) {
      ctx.reply(test);
    }

    ctx.answerCbQuery('');
  },
);

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
