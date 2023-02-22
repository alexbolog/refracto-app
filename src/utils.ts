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

export const getLargestUnitTimeUntil = (isoDate: string): string => {
  const diff = DateTime.fromISO(isoDate).diffNow([
    'years',
    'months',
    'days',
    'hours'
  ]);
  if (diff.years > 0) {
    return `${diff.years} years`;
  }

  if (diff.months > 0) {
    return `${diff.months} months`;
  }

  if (diff.weeks > 0) {
    return `${diff.weeks} weeks`;
  }

  if (diff.days > 0) {
    return `${diff.days} days`;
  }
  return '';
};

export const getDaysUntil = (isoDate: string): number => {
  return DateTime.fromISO(isoDate).diffNow('days').get('day');
};

export const getIsMobile = (): boolean => {
  return window.innerWidth <= 768;
};
