import { Controller } from '../controller';
import { StartService } from './start.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';
import { DatabaseConnection } from '../../connections/database.connection';

interface UserConfig {
  userId: number | null;
  userName: string | null;
  from?: string | null;
  to?: string | null;
}

interface EditMessageOptions {
  userId: number;
  userName: string;
  messageId: number;
  chatId: number;
}

interface SetCityOptions {
  userId: number;
  cityId: string;
  messageId: number;
  chatId: number;
}

export class StartController extends Controller {
  static config: { [key: number]: UserConfig } = {};

  constructor(private chatId: number | null, private queryId: string | null) {
    super();
  }

  public async start() {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getStartKeyboard())
      .build();

    await super.sendMessage(this.chatId!, 'Начать', options);
  }

  public async checkUserExistence(options: EditMessageOptions) {
    try {
      const { userId, userName, chatId, messageId } = options;
      const isValid = StartController.findUser(123);

      StartController.config[userId] = {} as UserConfig;
      StartController.config[userId].userId = userId;
      StartController.config[userId].userName = userName;

      if (!isValid) {
        await super.editMessageText(
          'Вы здесь впервые? Давайте проведём стартовую настройку!',
          {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
              inline_keyboard: StartService.getInitialSetupKeyboard(),
            },
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  public setDepartureCity(options: SetCityOptions) {
    try {
      const { userId, cityId, messageId, chatId } = options;
      StartController.config[userId].from = cityId;
      this.getArrivalCitiesKeyboard({ messageId, chatId });
    } catch (error) {
      console.log(error);
    }
  }

  public setArrivalCity(options: SetCityOptions) {
    try {
      const { userId, cityId, messageId, chatId } = options;
      StartController.config[userId].to = cityId;
      this.finishSetup({ userId, messageId, chatId });
    } catch (error) {
      console.log(error);
    }
  }

  public async getDepartureCitiesKeyboard(
    options: Pick<EditMessageOptions, 'messageId' | 'chatId'>,
  ) {
    try {
      const { messageId, chatId } = options;

      await super.editMessageText('Выберите город отправления', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: await StartService.getDepartureCitiesKeyboard(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async finishSetup(options: Omit<EditMessageOptions, 'userName'>) {
    try {
      const { chatId, userId, messageId } = options;

      await Promise.all([
        DatabaseConnection.connection('users').insert({
          id: StartController.config[userId].userId,
          name: StartController.config[userId].userName,
        }),
        DatabaseConnection.connection('settings').insert({
          user_id: StartController.config[userId].userId,
          city_from: StartController.config[userId].from,
          city_to: StartController.config[userId].to,
        }),
      ]);

      delete StartController.config[userId];

      await super.editMessageText('Настройка завершена', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: StartService.getSearchKeyboard(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  private async getArrivalCitiesKeyboard(
    options: Pick<EditMessageOptions, 'chatId' | 'messageId'>,
  ) {
    try {
      const { chatId, messageId } = options;

      await super.editMessageText('Выберите город прибытия', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: await StartService.getArrivalCitiesKeyboard(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  private static findUser(userId: number) {
    return false;
  }
}
