import { DateTime } from 'luxon';

const defaultFormat = DateTime.DATE_FULL;

export const formatJsDate = (jsDate: Date): string => {
  const date = DateTime.fromJSDate(jsDate);
  return formatDate(date);
};

export const formatDate = (
  luxonDate: DateTime,
  format?: Intl.DateTimeFormatOptions
) => {
  return luxonDate.toLocaleString(format ? format : defaultFormat);
};

export const formatRelativeDate = (luxonDate: DateTime): string => {
  return luxonDate.toRelative()!;
};

export const formatIso = (
  isoDate: string,
  format?: Intl.DateTimeFormatOptions
): string => {
  return formatDate(DateTime.fromISO(isoDate), format);
};

export const getDaysUntil = (isoDate: string): number => {
  // TODO: change to luxon difference. Return int
  return DateTime.fromISO(isoDate).diffNow('days').get('day');
};

export const getIsMobile = (): boolean => {
  return window.innerWidth <= 768;
};
