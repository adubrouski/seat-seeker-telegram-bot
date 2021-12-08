export class DateParser {
  constructor(private entryDate: string) {
    // entry date example: 8 Dec, Mo
  }

  public parse() {
    const datePart = this.entryDate.split(',')[0];

    const dateObject = new Date(Date.parse(datePart));
    dateObject.setFullYear(new Date().getFullYear());
    const year = this.getValidYear(dateObject.toISOString());
  }

  private getValidYear(date: string) {
    return (
      new Date(new Date(date).toDateString()) <
      new Date(new Date(new Date().getFullYear() + 1, 1, 1).toDateString())
    );
  }
}
