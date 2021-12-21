import appConfig from '../../appconfig.json';
import { Bot } from '../builders/Bot';
import { StartController } from '../modules/start/start.controller';
import { router } from '../router';
import { Database } from '../builders/Database';
import { ConnectionError } from '../errors/connection.error';

export const launch = () => {
  new Bot(appConfig.API_TOKEN, appConfig.BOT_CONFIG)
    .start()
    .then((bot) => {
      console.log('CONNECT TO TELEGRAM API - SUCCESS');
      const START_REGEXP = new RegExp('/start');

      bot.onText(START_REGEXP, ({ chat }) => {
        return new StartController(chat.id, null).start();
      });
      bot.on('callback_query', router);
    })
    .then(() => {
      return new Database(appConfig.DATABASE_CONFIG).connect();
    })
    .then((databaseName) => {
      console.log(`CONNECT TO ${databaseName} DATABASE - SUCCESS`);
      console.log('BOT IS RUNNING');
    })
    .catch((error) => {
      if (error instanceof ConnectionError) {
        const { details, message } = error;

        console.log(
          `${message}\nERROR CODE: ${details.code} ERROR TEXT: ${details.description}`,
        );
      }
      process.exit(1);
    });
};
