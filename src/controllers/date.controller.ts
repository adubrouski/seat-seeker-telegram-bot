import { getHtmlContent } from '../queries/html.query';
import { htmlParser } from '../../lib/html-parser';
import { Hiding, InlineKeyboardButton } from '../models/telegraf.model';
import { Markup } from 'telegraf';

export class DateController {
  static async getTimeListByDate(ctx: any) {
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
  }
}
