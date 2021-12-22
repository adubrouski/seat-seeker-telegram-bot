import { Controller } from '../controller';
import { StartService } from './start.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';

export class StartController extends Controller {
  constructor(private chatId: number | null, private queryId: string | null) {
    super();
  }

  private static findUser(userId: number) {
    return false;
  }

  public async start() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getStartKeyboard())
      .build();

    await super.sendMessage(this.chatId!, '123', options);
  }

  public async checkUserExistence(userId: number) {
    const isValid = StartController.findUser(123);

    if (!isValid) {
      const options = new MessageOptionsBuilder()
        .setInlineKeyboard(StartService.getInitialSetupKeyboard())
        .build();

      await super.sendMessage(
        this.chatId!,
        'Вы здесь впервые? Давайте проведём стартовую настройку!',
        options,
      );
      await super.answerCallbackQuery(this.queryId!);
    }
  }

  public setDepartureCity() {
    this.getArrivalCitiesKeyboard();
  }

  public setArrivalCity() {
    this.finishSetup();
  }

  public async getDepartureCitiesKeyboard() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getDepartureCitiesKeyboard())
      .build();

    await super.sendMessage(
      this.chatId!,
      'Выберите город отправления',
      options,
    );
    await super.answerCallbackQuery(this.queryId!);
  }

  public async finishSetup() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getSearchKeyboard())
      .build();

    await super.sendMessage(this.chatId!, 'Настройка заверешена!', options);
    await super.answerCallbackQuery(this.queryId!);
  }

  private async getArrivalCitiesKeyboard() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getArrivalCitiesKeyboard())
      .build();

    await super.sendMessage(this.chatId!, 'Выберите город прибытия', options);
    await super.answerCallbackQuery(this.queryId!);
  }
}
