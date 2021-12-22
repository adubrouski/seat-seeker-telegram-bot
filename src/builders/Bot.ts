import TelegramBot from 'node-telegram-bot-api';
import { ConnectionError } from '../errors/connection.error';

interface ConnectionConfig {
  token: string;
  options: TelegramBot.ConstructorOptions;
}

export class Bot {
  constructor(private connectionConfig: ConnectionConfig) {}

  public static instance: TelegramBot;

  public start() {
    const bot = new TelegramBot(
      this.connectionConfig.token,
      this.connectionConfig.options,
    );

    return Bot.checkConnection(bot)
      .then((name) => {
        Bot.instance = bot;
        return { bot, botName: name };
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
