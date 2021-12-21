import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
import { launch } from './services/launch.service';

dayjs.extend(localizedFormat);
dayjs.locale('ru');

launch();
