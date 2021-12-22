import { CitiesService } from './cities.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';
import { Controller } from '../controller';

export class CitiesController extends Controller {
  constructor(private userId: number, private queryId: string) {
    super();
  }

  public async getDepartureCities() {
    const options = new MessageOptionsBuilder()
      .setReplyMarkup({
        inline_keyboard: CitiesService.getDepartureCitiesKeyboard(),
      })
      .build();

    await super.sendMessage(this.userId, 'Choose departure city', options);
    await super.answerCallbackQuery(this.queryId, { show_alert: false });
  }

  public async getArrivalCities() {
    const options = new MessageOptionsBuilder()
      .setReplyMarkup({
        inline_keyboard: CitiesService.getArrivalCitiesKeyboard(),
      })
      .build();

    await super.sendMessage(this.userId, 'Choose arrival city', options);
    await super.answerCallbackQuery(this.queryId, { show_alert: false });
  }

  async getDatesKeyboard() {
    const options = new MessageOptionsBuilder()
      .setReplyMarkup({ inline_keyboard: CitiesService.getDatesKeyboard() })
      .build();

    await super.sendMessage(this.userId, '123', options);
    await super.answerCallbackQuery(this.queryId, { show_alert: false });
  }
}
