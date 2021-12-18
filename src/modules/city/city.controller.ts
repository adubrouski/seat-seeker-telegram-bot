import { CityService } from './city.service';
import { SendMessageOptionsBuilder } from '../../builders/SendMessageOptionsBuilder';
import { MainController } from '../main.controller';

export class CityController extends MainController {
  async getDatesKeyboard(chatId: number, queryId: string, cityId: string) {
    const options = new SendMessageOptionsBuilder()
      .setReplyMarkup({ inline_keyboard: CityService.getDatesKeyboard() })
      .build();

    await this.bot.sendMessage(chatId, '123', options);
    await this.bot.answerCallbackQuery(queryId, { show_alert: false });
  }
}
