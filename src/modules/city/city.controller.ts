import { bot } from '../../index';
import { CityService } from './city.service';
import { SendMessageOptionsBuilder } from '../../builders/SendMessageOptionsBuilder';

export class CityController {
  static async getDatesKeyboard(
    chatId: number,
    queryId: string,
    cityId: string,
  ) {
    const options = new SendMessageOptionsBuilder()
      .setReplyMarkup({ inline_keyboard: CityService.getDatesKeyboard() })
      .build();

    await bot.sendMessage(chatId, '123', options);
    await bot.answerCallbackQuery(queryId, { show_alert: false });
  }
}
