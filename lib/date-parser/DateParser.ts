import { Months } from './enum/months.enum';

export class DateParser {
  private readonly entryDate: Date;

  constructor(entryDate: string, entryTime: string) {
    const timePattern = new RegExp('^([01][0-9]|2[0-3]):([0-5][0-9])$');
    const datePattern = new RegExp(
      '^([1-9]|[12][0-9]|3[01]) [A-Z][a-z]{2}, [A-Z][a-z]$',
    );

    if (!datePattern.test(entryDate)) {
      throw Error('Date format is invalid, example: 8 Dec, Mo');
    }

    if (!timePattern.test(entryTime)) {
      throw Error('Time format is invalid, example: 23:00');
    }

    const datePart = entryDate.split(',')[0];
    const date = new Date(Date.parse(`${datePart} ${entryTime}`));
    const year = DateParser.getValidYear(date);
    date.setFullYear(year);
    this.entryDate = date;
  }

  public parseToISO() {
    const dateWithoutTimezoneOffset = DateParser.getDateWithoutTimezoneOffset(
      this.entryDate,
    );

    return dateWithoutTimezoneOffset.toISOString();
  }

  private static getValidYear(date: Date) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const isNextYearDate =
      currentDate.getMonth() !== Months.January &&
      date.getMonth() === Months.January;

    return isNextYearDate ? currentYear + 1 : currentYear;
  }

  private static getDateWithoutTimezoneOffset(date: Date) {
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - userTimezoneOffset);
  }
}
