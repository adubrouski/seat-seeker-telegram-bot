import { DateParser } from './DateParser';

export const dateParser = (date: string, time: string) =>
  new DateParser(date, time);
