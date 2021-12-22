import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { launch } from './launch/launch';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

launch();
