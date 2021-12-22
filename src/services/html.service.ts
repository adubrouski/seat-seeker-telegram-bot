import { HttpService } from './http.service';

const API_URL =
  '/%D0%9C%D0%B0%D1%80%D1%88%D1%80%D1%83%D1%82%D1%8B/%D0%9C%D0%B8%D0%BD%D1%81%D0%BA/%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE?date=2021-12-27&passengers=1&from=c625144&to=c627904';

const htmlService = new HttpService('https://atlasbus.by');

export const getHtmlContent = (): Promise<string | never> => {
  return htmlService
    .get(API_URL)
    .then(async (res) => {
      return await res.text();
    })
    .catch((error) => {
      return 'error';
    });
};
