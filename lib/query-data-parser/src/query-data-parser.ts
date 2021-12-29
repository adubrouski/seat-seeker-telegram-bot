export class QueryDataParser {
  constructor(private queryData: string) {}

  parseController() {
    return this.queryData.match(/\[(\w*?)]/)?.[1];
  }

  parseAction() {
    return this.queryData.match(/{(\w*?)}/)?.[1];
  }

  parseParameters() {
    const parameters = this.queryData.match(/\((.*?)\)/)?.[1];

    if (!parameters) return;

    return Object.fromEntries(
      parameters.split(',').map((item) => item.trim().split('=')),
    );
  }

  parse() {}
}
