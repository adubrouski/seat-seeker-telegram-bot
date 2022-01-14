import appConfig from '../../appconfig.json';
import { BotConnection } from '../connections/bot.connection';
import { StartController } from '../modules/start/start.controller';
import { router } from '../router';
import { DatabaseConnection } from '../connections/database.connection';
import { ConnectionError } from '../errors/connection.error';
import { START_REGEXP } from '../constants/constants';

export const launch = async () => {
  try {
    /* TELEGRAM API CONNECTION */
    const { bot, botName } = await new BotConnection(
      appConfig.telegramApiConfig,
    ).start();

    bot.onText(START_REGEXP, ({ chat }) => {
      return new StartController().init(chat.id);
    });
    bot.on('callback_query', router);

    console.log('CONNECT TO TELEGRAM API - SUCCESS');

    /* DATABASE CONNECTION */
    const databaseConnection = new DatabaseConnection(appConfig.databaseConfig);
    const databaseName = await databaseConnection.connect();

    console.log(`CONNECT TO ${databaseName} DATABASE - SUCCESS`);
    console.log(`BOT ${botName} IS RUNNING`);

    /* CREATE TABLES IF NOT EXIST */
  } catch (error) {
    if (error instanceof ConnectionError) {
      const { details, message } = error;

      console.log(
        `${message}\nERROR CODE: ${details.code} ERROR TEXT: ${details.description}`,
      );
    }
    process.exit(1);
  }
};
