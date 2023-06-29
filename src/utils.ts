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

export const fromIso = (isoDate: string): DateTime => {
  return DateTime.fromISO(isoDate);
};

export const formatIso = (
  isoDate: string,
  format?: Intl.DateTimeFormatOptions
): string => {
  return formatDate(DateTime.fromISO(isoDate), format);
};

export const getDaysUntil = (isoDate: string): number => {
  return DateTime.fromISO(isoDate).diffNow('days').get('day');
};

export const getIsMobile = (): boolean => {
  return window.innerWidth <= 768;
};

export const generateIdFromLabel = (label: string): string => {
  const lowercaseLabel = label.toLowerCase().replace(/\s/g, '-');
  return `${lowercaseLabel}-${Math.floor(Math.random() * 10000)}`;
};
