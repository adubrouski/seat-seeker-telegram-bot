import { bot } from '../../index';
import { CityService } from './city.service';

export class CityController {
  static getDatesKeyboard(chatId: number, cityId: string) {
    const opts = {
      reply_markup: {
        inline_keyboard: CityService.getDatesKeyboard(),
      },
    };

    bot.sendMessage(chatId, '123', opts);
  }
}
