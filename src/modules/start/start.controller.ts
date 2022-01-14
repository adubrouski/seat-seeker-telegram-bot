import { Controller } from '../controller';
import { StartService } from './start.service';
import { MessageOptionsBuilder } from '../../builders/message-options.builder';
import { DatabaseConnection } from '../../connections/database.connection';
import {
  IUsersRepository,
  User,
  UsersRepository,
} from '../../repositories/users.repository';
import { CitiesRepository } from '../../repositories/cities.repository';

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
  private startService: StartService;

  constructor() {
    super();
    this.startService = new StartService(
      new UsersRepository('users'),
      new CitiesRepository('cities'),
    );
  }

  public async init(chatId: number) {
    const options = new MessageOptionsBuilder()
      .setInlineKeyboard(StartService.getInitialKeyboard())
      .build();

    await super.sendMessage(chatId, 'Начать', options);
  }

  public async tryStartSearch(options: EditMessageOptions) {
    try {
      const { userId, userName, chatId, messageId } = options;
      const isUserExistence = await this.startService.checkUserExistence(
        options.userId,
      );

      if (!isUserExistence) {
        const { keyboard, message } = this.startService.getSettingsKeyboard();

        await super.editMessageText(message, {
          chat_id: chatId,
          message_id: messageId,
          reply_markup: keyboard,
        });

        return;
      }

      const { keyboard, message } = this.startService.getSearchKeyboard();

      await super.editMessageText(message, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public setDepartureCity(options: SetCityOptions) {
    try {
      const { userId, cityId, messageId, chatId } = options;

      this.getArrivalCitiesKeyboard({ messageId, chatId });
    } catch (error) {
      console.log(error);
    }
  }

  public setArrivalCity(options: SetCityOptions) {
    try {
      const { userId, cityId, messageId, chatId } = options;

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

      const { keyboard, message } =
        await this.startService.getDepartureCitiesKeyboard();

      await super.editMessageText(message, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async finishSetup(options: Omit<EditMessageOptions, 'userName'>) {
    try {
      const { chatId, userId, messageId } = options;

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
