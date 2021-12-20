import { DateParser } from './src/date-parser';

export const dateParser = (date: string, time: string) =>
  new DateParser(date, time);
