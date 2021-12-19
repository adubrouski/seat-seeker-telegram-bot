import { DateService } from './date.service';
import { SendMessageOptionsBuilder } from '../../builders/SendMessageOptionsBuilder';
import { queryStringParser } from '../../../lib/query-string-parser';
import { Bot } from '../../builders/Bot';

export class DateController {
  async getTimesKeyboard(chatId: number, url: string) {
    try {
      const { skip, take } =
        queryStringParser<{ skip: string; take: string }>(url).parse();
      console.log(url);
      const timesKeyboard = await DateService.getTimesKeyboard(
        Number(skip),
        Number(take),
      );
      console.log(skip, take);
      const options = new SendMessageOptionsBuilder()
        .setReplyMarkup({ inline_keyboard: timesKeyboard })
        .build();

      Bot.instance.sendMessage(chatId, '1233', options);
    } catch (error) {
      console.log(error);
    }
  }
}
