import { Controller } from '../controller';
import { StartService } from './start.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';
import { DatabaseConnection } from '../../connections/database.connection';

interface UserConfig {
  userId: number | null;
  userName: string | null;
  from: string | null;
  to: string | null;
}

export class StartController extends Controller {
  static config: UserConfig = {
    userId: null,
    userName: null,
    from: null,
    to: null,
  };

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

  public async checkUserExistence(userId: number, userName: string) {
    const isValid = StartController.findUser(123);

    StartController.config.userId = userId;
    StartController.config.userName = userName;

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

  public setDepartureCity(id: string) {
    StartController.config.from = id;
    this.getArrivalCitiesKeyboard();
  }

  public setArrivalCity(id: string) {
    StartController.config.to = id;
    this.finishSetup();
  }

  public async getDepartureCitiesKeyboard() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(await StartService.getDepartureCitiesKeyboard())
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
    console.log(StartController.config);
    try {
      await DatabaseConnection.connection('users').insert({
        id: StartController.config.userId,
        name: StartController.config.userName,
      });
      await DatabaseConnection.connection('settings').insert({
        user_id: StartController.config.userId,
        city_from: StartController.config.from,
        city_to: StartController.config.to,
      });
    } catch (e) {
      console.log(e);
    }

    await super.sendMessage(this.chatId!, 'Настройка заверешена!', options);
    await super.answerCallbackQuery(this.queryId!);
  }

  private async getArrivalCitiesKeyboard() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(await StartService.getArrivalCitiesKeyboard())
      .build();

    await super.sendMessage(this.chatId!, 'Выберите город прибытия', options);
    await super.answerCallbackQuery(this.queryId!);
  }
}
