export class QueryDataParser {
  constructor(private queryData: string) {}

  parseController() {
    return this.queryData.match(/\[(\w*?)]/)?.[1];
  }

  parseAction() {
    return this.queryData.match(/#(\w*?)#/)?.[1];
  }

  parseParameters<T>(): T {
    const parameters = this.queryData.match(/{(.*?)}/)![0];

    return JSON.parse(parameters);
  }
}
