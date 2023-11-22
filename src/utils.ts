import { DateTime } from 'luxon';
import BigNumber from 'bignumber.js';
const DEFAULT_DECIMALS = 18;
export const USDC_DECIMALS_AMOUNT = 6;

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

export const getAccruedInterest = (
  principal: number,
  annualReturnRate: number,
  days: number
) => {
  const dailyInterestRate = annualReturnRate / 365;
  const accruedInterest = principal * dailyInterestRate * days;
  return accruedInterest;
};

export const getCurrentAmountWithInterest = (
  principal: number,
  annualReturnRate: number,
  days: number
) => {
  const interest = getAccruedInterest(principal, annualReturnRate, days);
  return principal + interest;
};

export const denominatedAmountToAmount = (
  balance: string,
  decimals?: number | undefined
) => {
  return new BigNumber(balance)
    .shiftedBy(-(decimals ?? DEFAULT_DECIMALS))
    .toNumber();
};

export const getExpectedReturnAmount = (
  principal: number,
  returnRate: number
) => {
  return principal * returnRate;
};
