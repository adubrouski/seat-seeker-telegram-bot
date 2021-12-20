import { HtmlParser } from './src/html-parser';

export const htmlParser = (htmlDocument: string) =>
  new HtmlParser(htmlDocument);
