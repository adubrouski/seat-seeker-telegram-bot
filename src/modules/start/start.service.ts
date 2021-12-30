import { DatabaseConnection } from '../../connections/database.connection';
import {
  CallbackDataOptions,
  createCallbackData,
} from '../../helpers/query-data.helper';
import { StartAction } from '../../models/start-controller.model';

export class StartService {
  static createCallbackData = (
    options: Omit<CallbackDataOptions<StartAction>, 'controller'>,
  ) => createCallbackData<StartAction>({ ...options, controller: 'start' });

  static async getDepartureCitiesKeyboard() {
    try {
      const cities = await DatabaseConnection.connection
        .table('cities')
        .select();

      return cities.reduce((acc, item, index, array) => {
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
      }, []);
    } catch (error) {
      console.log(error);
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

  static getInitialSetupKeyboard() {
    const callbackData = StartService.createCallbackData({
      action: 'GET_DEPARTURE_CITIES',
    });

    return [
      [
        {
          text: 'Давай!',
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
