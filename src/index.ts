import appConfig from '../appconfig.json';
import { launchBot } from './startup/launch-bot';

launchBot(appConfig.API_TOKEN, appConfig.BOT_CONFIG).then(() => {
  console.log('BOT IS RUNNING');
});
