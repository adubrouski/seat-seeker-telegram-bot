import { QueryStringParser } from './QueryStringParser';

export const queryStringParser = <T>(url: string) =>
  new QueryStringParser<T>(url);
