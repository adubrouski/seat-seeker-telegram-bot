import { getHtmlContent } from '../../queries/html.query';
import { htmlParser } from '../../../lib/html-parser';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

export class DateService {
  static async getTimesKeyboard(
    skip: number,
    take: number,
  ): Promise<InlineKeyboardButton[][]> {
    const htmlContent = await getHtmlContent();
    const parsedHtml = htmlParser(htmlContent).parse();

    return parsedHtml.reduce(
      (acc: InlineKeyboardButton[][], item, index, array) => {
        if (index >= skip && index <= skip + take && index % 2) {
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
        } else if (acc.length === 3) {
          acc.push([
            {
              text: '\u{2B05}',
              callback_data: `/date/${array[
                index - 1
              ].pointOfDeparture.date.toISOString()}`,
            },
            {
              text: '\u{27A1}',
              callback_data: `/date/${item.pointOfDeparture.date.toISOString()}?skip=${
                skip + 6
              }&take=6`,
            },
          ]);
        }

        return acc;
      },
      [],
    );
  }
}
