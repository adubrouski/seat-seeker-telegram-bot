export class QueryStringParser<T> {
  constructor(private readonly url: string) {}

  parse(): T {
    const queryString = this.getQueryString();
    return queryString.split('&').reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = value;

      return acc;
    }, {} as any);
  }

  getQueryString() {
    return this.url.split('?')[1];
  }
}
