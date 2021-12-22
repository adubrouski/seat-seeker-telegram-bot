import { BotConnection } from '../connections/bot.connection';
import TelegramBot from 'node-telegram-bot-api';

export class Controller {
  protected sendMessage(
    chatId: TelegramBot.ChatId,
    text: string,
    options?: TelegramBot.SendMessageOptions,
  ) {
    return BotConnection.instance.sendMessage(chatId, text, options);
  }

  protected answerCallbackQuery(
    callbackQueryId: string,
    options?: Partial<TelegramBot.AnswerCallbackQueryOptions>,
  ) {
    return BotConnection.instance.answerCallbackQuery(callbackQueryId, options);
  }
}
