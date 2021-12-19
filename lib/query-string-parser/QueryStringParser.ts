export class QueryStringParser<T> {
  constructor(private readonly url: string) {}

  parse(): T | undefined {
    if (!this.url.includes('?')) {
      return;
    }
    const entries = this.getQueryString()
      .split('&')
      .map((item) => item.split('='));

    return Object.fromEntries(entries);
  }

  private getQueryString() {
    return this.url.split('?')[1];
  }
}
