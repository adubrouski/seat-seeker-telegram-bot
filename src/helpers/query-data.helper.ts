import { isObject } from './common.helper';

export interface CallbackDataOptions<T> {
  controller: string;
  action: T;
  parameters?: unknown;
}

export const createCallbackData = <T>(options: CallbackDataOptions<T>) => {
  const { controller, action } = options;

  const parameters = isObject(options.parameters)
    ? JSON.stringify(options.parameters)
    : JSON.stringify({});

  return `[${controller}]#${action}#${parameters}`;
};
