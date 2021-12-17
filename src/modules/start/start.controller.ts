import { Message } from 'node-telegram-bot-api';
import { MainController } from '../main.controller';

export class StartController extends MainController {
  getCitiesKeyboard(msg: Message) {
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
    this.bot.sendMessage(msg.chat.id, "I'm a test robot", opts);
  }
}
