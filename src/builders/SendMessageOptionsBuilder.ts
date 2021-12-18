import TelegramBot, {
  ForceReply,
  InlineKeyboardMarkup,
  ParseMode,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
} from 'node-telegram-bot-api';

export class SendMessageOptionsBuilder {
  private readonly sendMessageOptions: TelegramBot.SendMessageOptions;

  constructor() {
    this.sendMessageOptions = {};

    return this;
  }

  setParseMode(parseMode: ParseMode) {
    this.sendMessageOptions.parse_mode = parseMode;

    return this;
  }

  setDisableWebPagePreview(state: boolean) {
    this.sendMessageOptions.disable_web_page_preview = state;

    return this;
  }

  setDisableNotification(state: boolean) {
    this.sendMessageOptions.disable_notification = state;

    return this;
  }

  setReplyToMessageId(messageId: number) {
    this.sendMessageOptions.reply_to_message_id = messageId;

    return this;
  }

  setReplyMarkup(
    replyMarkup:
      | InlineKeyboardMarkup
      | ReplyKeyboardMarkup
      | ReplyKeyboardRemove
      | ForceReply,
  ) {
    this.sendMessageOptions.reply_markup = replyMarkup;

    return this;
  }

  build() {
    return this.sendMessageOptions;
  }
}
