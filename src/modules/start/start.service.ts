import { DatabaseConnection } from '../../connections/database.connection';
import {
  CallbackDataOptions,
  createCallbackData,
} from '../../helpers/query-data.helper';
import { StartAction } from '../../models/start-controller.model';
import { UsersRepository } from '../../repositories/users.repository';
import { CitiesRepository } from '../../repositories/cities.repository';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

interface ReplyItem {
  keyboard: {
    inline_keyboard: InlineKeyboardButton[][];
  };
  message: string;
}

export class StartService {
  static createCallbackData = (
    options: Omit<CallbackDataOptions<StartAction>, 'controller'>,
  ) => createCallbackData<StartAction>({ ...options, controller: 'start' });

  constructor(
    private userRepository: UsersRepository,
    private citiesRepository: CitiesRepository,
  ) {}

  public async getStartItems(userId: number) {
    const isUserExist = await this.userRepository.isUserExist({ id: userId });
    const callbackData = StartService.createCallbackData({
      action: isUserExist ? 'START_SEARCH' : 'GET_DEPARTURE_CITIES',
    });

    if (isUserExist) {
      return {
        keyboard: {
          inline_keyboard: [
            [
              {
                text: 'Выбрать маршрут',
                callback_data: callbackData,
              },
            ],
          ],
        },
        message: 'Профиль найден!',
      };
    }

    return {
      keyboard: {
        inline_keyboard: [
          [
            {
              text: 'Начать настройку',
              callback_data: callbackData,
            },
          ],
        ],
      },
      message: 'Вы здесь впервые? Давайте проведем стартовую настройку!',
    };
  }

  public async getDepartureCitiesKeyboard(): Promise<ReplyItem> {
    try {
      const cities = await this.citiesRepository.findAll();

      const keyboard = cities.reduce((acc, item, index, array) => {
        const increasedIndex = index + 1;

        if (increasedIndex % 3 === 0 && index !== 0) {
          acc.push([
            {
              text: array[index].name,
              callback_data: StartService.createCallbackData({
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index].id },
              }),
            },
            {
              text: array[index - 1].name,
              callback_data: StartService.createCallbackData({
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index - 1].id },
              }),
            },
            {
              text: array[index - 2].name,
              callback_data: StartService.createCallbackData({
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index - 2].id },
              }),
            },
          ]);
        }

        return acc;
      }, [] as InlineKeyboardButton[][]);

      return {
        keyboard: {
          inline_keyboard: keyboard,
        },
        message: 'Выберите город отправления',
      };
    } catch (error) {
      console.log(error);
      return {} as ReplyItem;
    }
  }

  static async getArrivalCitiesKeyboard() {
    const cities = await DatabaseConnection.connection.table('cities').select();

    return cities.reduce((acc, item, index, array) => {
      const increasedIndex = index + 1;

      if (increasedIndex % 3 === 0 && index !== 0) {
        acc.push([
          {
            text: array[index].name,
            callback_data: StartService.createCallbackData({
              action: 'SET_ARRIVAL_CITY',
              parameters: { id: array[index].id },
            }),
          },
          {
            text: array[index - 1].name,
            callback_data: StartService.createCallbackData({
              action: 'SET_ARRIVAL_CITY',
              parameters: { id: array[index - 1].id },
            }),
          },
          {
            text: array[index - 2].name,
            callback_data: StartService.createCallbackData({
              action: 'SET_ARRIVAL_CITY',
              parameters: { id: array[index - 2].id },
            }),
          },
        ]);
      }

      return acc;
    }, []);
  }

  static getStartKeyboard() {
    const callbackData = StartService.createCallbackData({
      action: 'CHECK_USER_EXISTENCE',
    });

    return [
      [
        {
          text: "Let's go!",
          callback_data: callbackData,
        },
      ],
    ];
  }

  static getSearchKeyboard() {
    return [
      [
        {
          text: 'Искать маршрутку',
          callback_data: '/start/check-user-settings',
        },
      ],
    ];
  }
}
