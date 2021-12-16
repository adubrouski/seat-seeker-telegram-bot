import { bot } from '../../index';
import { Message } from 'node-telegram-bot-api';

export class StartController {
  static getCitiesKeyboard(msg: Message) {
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'city1', callback_data: '/city/1' },
            { text: 'city2', callback_data: '/city/1' },
          ],
        ],
      },
    };

    bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
  }
}
