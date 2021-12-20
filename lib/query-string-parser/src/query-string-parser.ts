export class QueryStringParser {
  constructor(private readonly path: string) {}

  parse() {
    if (!this.path.includes('?')) return;

    const entries = this.getQueryString()
      .split('&')
      .map((item) => item.split('='));

    return Object.fromEntries(entries);
  }

  private getQueryString() {
    return this.path.split('?')[1];
  }
}
