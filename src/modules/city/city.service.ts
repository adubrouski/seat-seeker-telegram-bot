import dayjs from 'dayjs';
import { InlineKeyboardButton } from 'node-telegram-bot-api';

export class CityService {
  static getDatesKeyboard() {
    const test = [];

    for (let i = dayjs().get('date'); i < dayjs().get('date') + 10; i++) {
      const ggg = dayjs().set('date', i);
      test.push(ggg);
    }

    return test.reduce((acc: InlineKeyboardButton[][], item, index, array) => {
      if (index % 2) {
        acc.push([
          {
            text: array[index - 1].format('D MMMM (dd)'),
            callback_data: `/date/${array[index - 1].toISOString()}`,
          },
          {
            text: item.format('D MMMM (dd)'),
            callback_data: `/date/${item.toISOString()}`,
          },
        ]);
      }

      return acc;
    }, []);
  }
}
