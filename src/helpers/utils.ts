import BigNumber from 'bignumber.js';
const DEFAULT_DECIMALS = 18;
export const USDC_DECIMALS_AMOUNT = 6;

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
