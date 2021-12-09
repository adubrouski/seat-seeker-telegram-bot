import { getHtmlContent } from './queries/html.query';
import { htmlParser } from '../lib/html-parser';
import { dateParser } from '../lib/date-parser';
import chalk from 'chalk';

(async () => {
  try {
    const html = await getHtmlContent();
    const routes = htmlParser(html).parse();

    console.log(routes);
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.blackBright.bgRed.bold(error.message));
      console.log(chalk.red(error.stack));
    }
  }
})();
