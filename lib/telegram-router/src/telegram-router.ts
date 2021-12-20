import { QueryStringParser } from '../../query-string-parser/src/query-string-parser';

export class TelegramRouter {
  constructor(private currentPath: string) {}

  public match<T>(endpoint: string, callback: (req: T) => void) {
    const req: any = {};
    if (endpoint.indexOf('/:') >= 0) {
      const [path, parameter] = endpoint.split('/:');

      if (new RegExp(`${path}\/\\w+$`).test(this.currentPath)) {
        const urlParts = this.currentPath.split('/');
        const req: any = {
          parameter: {
            [parameter]: urlParts[urlParts.length - 1],
          },
        };
        callback(req);
      }
    }

    if (new RegExp(`${endpoint}$|${endpoint}\\?(.+)?`).test(this.currentPath)) {
      if (new RegExp(`${endpoint}\\?(.+)?`).test(this.currentPath)) {
        req.queryParameters = new QueryStringParser(this.currentPath).parse();
      }

      callback(req);
    }
  }
}
