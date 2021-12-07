import cheerio from 'cheerio';
import {
  getRoutesListFromContainer,
  validateRouteContainer,
} from '../utils/html.utils';

export const parseHtmlToRoutesList = (htmlDocument: string) => {
  const $ = cheerio.load(htmlDocument);
  const { routes, appendRouteByContainer } = getRoutesListFromContainer();

  $('#__next > div > .MuiContainer-root > .MuiGrid-container > div')
    .first()
    .children('div')
    .not(':nth-last-child(-n+2)')
    .filter(validateRouteContainer)
    .each(appendRouteByContainer);

  return routes;
};
