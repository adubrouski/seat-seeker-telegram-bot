import { QueryStringParser } from '../query-string-parser/QueryStringParser';

export class Router {
  constructor(private currentUrl: string) {}

  public match(endpoint: string, callback: (req: any) => void) {
    const req: any = {};
    if (endpoint.indexOf('/:') >= 0) {
      const [path, parameter] = endpoint.split('/:');

      if (new RegExp(`${path}\/\\w+$`).test(this.currentUrl)) {
        const urlParts = this.currentUrl.split('/');
        const req = {
          parameters: {
            [parameter]: urlParts[urlParts.length - 1],
          },
        };
        callback(req);
      }
    }

    if (new RegExp(`${endpoint}$|${endpoint}\\?(.+)?`).test(this.currentUrl)) {
      if (new RegExp(`${endpoint}\\?(.+)?`).test(this.currentUrl)) {
        req.queryParameters = new QueryStringParser(this.currentUrl).parse();
      }

      callback(req);
    }
  }
}
