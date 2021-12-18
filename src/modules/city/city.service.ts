import dayjs from 'dayjs';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

export class CityService {
  static getDatesKeyboard() {
    const nextDates = CityService.getNextDates(10);

    return nextDates.reduce(
      (acc: InlineKeyboardButton[][], item, index, array) => {
        if (index % 2) {
          acc.push([
            {
              text: array[index - 1].format('D MMMM (dd)'),
              callback_data: `/date/${array[
                index - 1
              ].toISOString()}?skip=0&take=6`,
            },
            {
              text: item.format('D MMMM (dd)'),
              callback_data: `/date/${item.toISOString()}?skip=0&take=6`,
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
}
