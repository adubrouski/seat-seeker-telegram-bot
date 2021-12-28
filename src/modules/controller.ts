import { BotConnection } from '../connections/bot.connection';
import TelegramBot, {
  EditMessageReplyMarkupOptions,
  EditMessageTextOptions,
  InlineKeyboardMarkup,
} from 'node-telegram-bot-api';

export class Controller {
  protected sendMessage(
    chatId: TelegramBot.ChatId,
    text: string,
    options?: TelegramBot.SendMessageOptions,
  ) {
    return BotConnection.instance.sendMessage(chatId, text, options);
  }

  protected editMessageText(text: string, options: EditMessageTextOptions) {
    return BotConnection.instance.editMessageText(text, options);
  }

  protected answerCallbackQuery(
    callbackQueryId: string,
    options?: Partial<TelegramBot.AnswerCallbackQueryOptions>,
  ) {
    return BotConnection.instance.answerCallbackQuery(callbackQueryId, options);
  }
}
