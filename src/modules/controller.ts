import { Bot } from '../builders/Bot';
import TelegramBot from 'node-telegram-bot-api';

export class Controller {
  protected sendMessage(
    chatId: TelegramBot.ChatId,
    text: string,
    options?: TelegramBot.SendMessageOptions,
  ) {
    return Bot.instance.sendMessage(chatId, text, options);
  }

  protected answerCallbackQuery(
    callbackQueryId: string,
    options?: Partial<TelegramBot.AnswerCallbackQueryOptions>,
  ) {
    return Bot.instance.answerCallbackQuery(callbackQueryId, options);
  }
}
