import { getHtmlContent } from '../../queries/html.query';
import { htmlParser } from '../../../lib/html-parser';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

export class DateService {
  static async getKeyboard() {
    const rr = await getHtmlContent();
    const test = htmlParser(rr).parse();

    return test.reduce((acc: InlineKeyboardButton[][], item, index, array) => {
      if (index % 2) {
        acc.push([
          {
            text: array[index - 1].pointOfDeparture.date.format('HH:mm'),
            callback_data: `/time/${array[
              index - 1
            ].pointOfDeparture.date.toISOString()}`,
          },
          {
            text: item.pointOfDeparture.date.format('HH:mm'),
            callback_data: `/time/${item.pointOfDeparture.date.toISOString()}`,
          },
        ]);
      }

      return acc;
    }, []);
  }
}
