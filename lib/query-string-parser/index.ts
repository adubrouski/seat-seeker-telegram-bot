import { QueryStringParser } from './src/query-string-parser';

export const queryStringParser = <T>(url: string) => new QueryStringParser(url);
