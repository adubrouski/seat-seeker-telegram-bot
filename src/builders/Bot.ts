import TelegramBot from 'node-telegram-bot-api';
import { ConnectionError } from '../errors/connection.error';

export class Bot {
  constructor(
    private apiToken: string,
    private config: TelegramBot.ConstructorOptions,
  ) {}

  public static instance: TelegramBot;

  public start() {
    const bot = new TelegramBot(this.apiToken, this.config);

    return Bot.checkConnection(bot)
      .then((name) => {
        Bot.instance = bot;
        return bot;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  private static checkConnection(bot: TelegramBot) {
    return bot
      .getMe()
      .then((bot) => bot.first_name)
      .catch((error) =>
        Promise.reject(
          new ConnectionError('TelegramConnectionError', {
            code: error?.response?.statusCode ?? 999,
            description: error?.response?.statusMessage ?? 'Unknown error',
          }),
        ),
      );
  }
}
