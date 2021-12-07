import { getHtmlContent } from './queries/html.query';
import { parseHtmlToRoutesList } from './helpers/html.helper';

(async () => {
  try {
    const html = await getHtmlContent();
    const routes = parseHtmlToRoutesList(html);
    console.log(routes);
  } catch (error) {
    console.log(error);
  }
})();
