import { getHtmlContent } from './queries/html.query';
import { htmlParser } from '../lib/html-parser';

(async () => {
  try {
    const html = await getHtmlContent();
    const routes = htmlParser(html).parse();
    console.log(routes);
  } catch (error) {
    console.log(error);
  }
})();
