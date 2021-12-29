import { DatabaseConnection } from '../../connections/database.connection';

export class StartService {
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
              text: array[index - 1].name,
              callback_data: `/start/initial-setup/set-departure-city/${
                array[index - 1].id
              }`,
            },
            {
              text: array[index - 2].name,
              callback_data: `/start/initial-setup/set-departure-city/${
                array[index - 2].id
              }`,
            },
            {
              text: array[index].name,
              callback_data: `/start/initial-setup/set-departure-city/${array[index].id}`,
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
            text: array[index - 1].name,
            callback_data: `/start/initial-setup/set-arrival-city/${
              array[index - 1].id
            }`,
          },
          {
            text: array[index - 2].name,
            callback_data: `/start/initial-setup/set-arrival-city/${
              array[index - 2].id
            }`,
          },
          {
            text: array[index].name,
            callback_data: `/start/initial-setup/set-arrival-city/${array[index].id}`,
          },
        ]);
      }

      return acc;
    }, []);
  }

  static getStartKeyboard() {
    return [
      [
        {
          text: "Let's go!",
          callback_data: '[start]{CHECK_USER_EXISTENCE}(skip=0,take=20)',
        },
      ],
    ];
  }

  static getInitialSetupKeyboard() {
    return [
      [
        {
          text: 'Давай!',
          callback_data: '/start/initial-setup/departure-city-list',
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
