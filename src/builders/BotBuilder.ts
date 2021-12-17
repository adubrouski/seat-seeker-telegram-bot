import TelegramBot from 'node-telegram-bot-api';

export class BotBuilder {
  static bot: TelegramBot;

  private apiToken: null | string;
  private config: TelegramBot.ConstructorOptions;

  constructor() {
    this.apiToken = null;
    this.config = {};
  }

  public setApiToken(apiToken: string) {
    this.apiToken = apiToken;

    return this;
  }

  public setConfig(config: TelegramBot.ConstructorOptions) {
    this.config = config;

    return this;
  }

  public async build() {
    if (!this.apiToken) {
      throw new Error('API token cannot be empty');
    }

    const bot = new TelegramBot(this.apiToken, this.config);

    if (await this.checkConnection(bot)) {
      BotBuilder.bot = bot;
      return bot;
    }

    throw new Error();
  }

  private async checkConnection(bot: TelegramBot) {
    try {
      const gg = await bot.getMe();
      console.log('bot running');
      return true;
    } catch (error) {
      console.log('ERRROR');
      return false;
    }
  }
}
