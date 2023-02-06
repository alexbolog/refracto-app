import { DateTime } from 'luxon';

const defaultFormat = DateTime.DATE_FULL;

export const formatJsDate = (jsDate: Date) => {
  const date = DateTime.fromJSDate(jsDate);
  return formatDate(date);
};

export const formatDate = (
  luxonDate: DateTime,
  format?: Intl.DateTimeFormatOptions
) => {
  return luxonDate.toLocaleString(format ? format : defaultFormat);
};

export const formatIso = (
  isoDate: string,
  format?: Intl.DateTimeFormatOptions
) => {
  return formatDate(DateTime.fromISO(isoDate), format);
};
