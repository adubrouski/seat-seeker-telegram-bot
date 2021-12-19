import dayjs from 'dayjs';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

export class CitiesService {
  static getDatesKeyboard() {
    const nextDates = CitiesService.getNextDates(10);

    return nextDates.reduce(
      (acc: InlineKeyboardButton[][], item, index, array) => {
        if (index % 2) {
          acc.push([
            {
              text: array[index - 1].format('D MMMM (dd)'),
              callback_data: `/date?date=${array[
                index - 1
              ].toISOString()}&skip=0&take=6`,
            },
            {
              text: item.format('D MMMM (dd)'),
              callback_data: `/date?date=${item.toISOString()}&skip=0&take=6`,
            },
          ]);
        }

        return acc;
      },
      [],
    );
  }

  static getNextDates(count: number) {
    const dayList = [];

    for (let i = dayjs().get('date'); i < dayjs().get('date') + count; i++) {
      const newDate = dayjs().set('date', i);

      dayList.push(newDate);
    }

    return dayList;
  }

  static getDepartureCitiesKeyboard(): InlineKeyboardButton[][] {
    return [
      [
        { text: 'DEPARTURE CITY1', callback_data: '/city/1' },
        { text: 'DEPARTURE CITY2', callback_data: '/city/2' },
      ],
      [
        { text: 'DEPARTURE CITY3', callback_data: '/city/3' },
        { text: 'DEPARTURE CITY4', callback_data: '/city/4' },
      ],
    ];
  }

  static getArrivalCitiesKeyboard(): InlineKeyboardButton[][] {
    return [
      [
        { text: 'ARRIVAL CITY1', callback_data: '/city/1' },
        { text: 'ARRIVAL CITY2', callback_data: '/city/2' },
      ],
      [
        { text: 'ARRIVAL CITY3', callback_data: '/city/3' },
        { text: 'ARRIVAL CITY4', callback_data: '/city/4' },
      ],
    ];
  }
}
