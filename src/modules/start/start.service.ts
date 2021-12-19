export class StartService {
  static getDepartureCitiesKeyboard() {
    return [
      [
        {
          text: 'DepCity1',
          callback_data: '/start/initial-setup/set-departure-city/2',
        },
        {
          text: 'DepCity2',
          callback_data: '/start/initial-setup/set-departure-city/2',
        },
        {
          text: 'DepCity3',
          callback_data: '/start/initial-setup/set-departure-city/3',
        },
      ],
      [
        {
          text: 'DepCity4',
          callback_data: '/start/initial-setup/set-departure-city/4',
        },
        {
          text: 'DepCity5',
          callback_data: '/start/initial-setup/set-departure-city/5',
        },
        {
          text: 'DepCity6',
          callback_data: '/start/initial-setup/set-departure-city/6',
        },
      ],
    ];
  }

  static getArrivalCitiesKeyboard() {
    return [
      [
        {
          text: 'ArrCity1',
          callback_data: '/start/initial-setup/set-arrival-city/1',
        },
        {
          text: 'ArrCity2',
          callback_data: '/start/initial-setup/set-arrival-city/2',
        },
        {
          text: 'ArrCity3',
          callback_data: '/start/initial-setup/set-arrival-city/3',
        },
      ],
      [
        {
          text: 'ArrCity4',
          callback_data: '/start/initial-setup/set-arrival-city/4',
        },
        {
          text: 'ArrCity5',
          callback_data: '/start/initial-setup/set-arrival-city/5',
        },
        {
          text: 'ArrCity6',
          callback_data: '/start/initial-setup/set-arrival-city/6',
        },
      ],
    ];
  }

  static getStartKeyboard() {
    return [
      [
        {
          text: "Let's go!",
          callback_data: '/start/user-existence',
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
