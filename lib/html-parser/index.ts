import { HtmlParser } from './HtmlParser';

export const htmlParser = (htmlDocument: string) =>
  new HtmlParser(htmlDocument);
