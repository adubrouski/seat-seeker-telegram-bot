import TelegramBot from 'node-telegram-bot-api';
import { TelegramConnectionError } from '../errors/telegram-connection-error';

export class Bot {
  public static instance: TelegramBot;

  constructor(
    private apiToken: string,
    private config: TelegramBot.ConstructorOptions,
  ) {}

  public async start() {
    try {
      const bot = new TelegramBot(this.apiToken, this.config);

      await Bot.checkConnection(bot);

      Bot.instance = bot;

      return bot;
    } catch (error) {
      throw error;
    }
  }

  private static async checkConnection(bot: TelegramBot) {
    try {
      await bot.getMe();

      return true;
    } catch (error) {
      throw new TelegramConnectionError('ConnectionError', {
        status: error?.response?.statusCode ?? 500,
        statusText: error?.response?.statusMessage ?? 'Internal server error',
      });
    }
  }
}
