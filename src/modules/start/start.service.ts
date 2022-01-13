import { DatabaseConnection } from '../../connections/database.connection';
import { createCallbackData } from '../../helpers/query-data.helper';
import { IUsersRepository, User } from '../../repositories/users.repository';
import { City, ICitiesRepository } from '../../repositories/cities.repository';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

interface ReplyItem {
  keyboard: {
    inline_keyboard: InlineKeyboardButton[][];
  };
  message: string;
}

export class StartService {
  constructor(
    private userRepository: IUsersRepository<User>,
    private citiesRepository: ICitiesRepository<City>,
  ) {}

  public async getStartItems(userId: number) {
    const isUserExist = await this.userRepository.isUserExist({ id: userId });

    const callbackData = createCallbackData({
      controller: 'start',
      action: isUserExist ? 'START_SEARCH' : 'GET_DEPARTURE_CITIES',
    });

    return {
      keyboard: {
        inline_keyboard: [
          [
            {
              text: isUserExist ? 'Выбрать маршрут' : 'Начать настройку',
              callback_data: callbackData,
            },
          ],
        ],
      },
      message: isUserExist
        ? 'Профиль найден!'
        : 'Вы здесь впервые? Давайте проведем стартовую настройку!',
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
              text: array[index].city_name,
              callback_data: createCallbackData({
                controller: 'start',
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index].city_id },
              }),
            },
            {
              text: array[index - 1].city_name,
              callback_data: createCallbackData({
                controller: 'start',
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index - 1].city_id },
              }),
            },
            {
              text: array[index - 2].city_name,
              callback_data: createCallbackData({
                controller: 'start',
                action: 'SET_DEPARTURE_CITY',
                parameters: { id: array[index - 2].city_id },
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
            callback_data: createCallbackData({
              controller: 'settings',
              action: 'SET_ARRIVAL_CITY',
              parameters: { id: array[index].id },
            }),
          },
          {
            text: array[index - 1].name,
            callback_data: createCallbackData({
              controller: 'settings',
              action: 'SET_ARRIVAL_CITY',
              parameters: { id: array[index - 1].id },
            }),
          },
          {
            text: array[index - 2].name,
            callback_data: createCallbackData({
              controller: 'settings',
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
    const callbackData = createCallbackData({
      controller: 'start',
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
