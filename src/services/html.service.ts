import https from 'https';
import { ConnectionError } from '../errors/connection.error';

const API_URL =
  'https://atlasbus.by/%D0%9C%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA/%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE?date=2021-12-27&passengers=1&from=c625144&to=c627904';

export const getHtmlContent = (): Promise<string | never> => {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      if (res.statusCode !== 200) {
        reject(
          new ConnectionError(
            'An error occurred while retrieving html document',
            {
              code: res.statusCode ?? 503,
              description: res.statusMessage ?? 'Service unavailable',
            },
          ),
        );
      }

      let HTMLDocument: string;

      res.on('data', (chunk: Buffer) => {
        HTMLDocument += chunk;
      });

      res.on('end', () => {
        resolve(HTMLDocument);
      });

      res.on('error', () => {
        console.log('123');
      });
    });
  });
};
