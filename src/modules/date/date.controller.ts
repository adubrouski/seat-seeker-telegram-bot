import { DateService } from './date.service';
import { SendMessageOptionsBuilder } from '../../builders/SendMessageOptionsBuilder';
import { queryStringParser } from '../../../lib/query-string-parser';
import { MainController } from '../main.controller';

export class DateController extends MainController {
  async getTimesKeyboard(chatId: number, url: string) {
    try {
      const { skip, take } =
        queryStringParser<{ skip: string; take: string }>(url).parse();
      const timesKeyboard = await DateService.getTimesKeyboard(
        Number(skip),
        Number(take),
      );
      console.log(skip, take);
      const options = new SendMessageOptionsBuilder()
        .setReplyMarkup({ inline_keyboard: timesKeyboard })
        .build();

      this.bot.sendMessage(chatId, '1233', options);
    } catch (error) {
      console.log(error);
    }
  }
}
