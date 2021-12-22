import { DateService } from './date.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';
import { queryStringParser } from '../../../lib/query-string-parser';
import { BotConnection } from '../../connections/bot.connection';

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
      const options = new MessageOptionsBuilder()
        .setReplyMarkup({ inline_keyboard: timesKeyboard })
        .build();

      BotConnection.instance.sendMessage(chatId, '1233', options);
    } catch (error) {
      console.log(error);
    }
  }
}
