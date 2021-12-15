import { bot } from '../../index';
import { DateService } from './date.service';

export class DateController {
  static async getTimesKeyboard(chatId: number) {
    const gg = await DateService.getKeyboard();

    const opts = {
      reply_markup: {
        inline_keyboard: gg,
        gg,
      },
    };

    bot.sendMessage(chatId, '1233', opts as any);
  }
}
