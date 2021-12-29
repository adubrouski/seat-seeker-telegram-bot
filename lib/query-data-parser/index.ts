import { QueryDataParser } from './src/query-data-parser';

export const queryDataParser = (queryData: string) =>
  new QueryDataParser(queryData);
