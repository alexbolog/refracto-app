import { AccountOverview } from 'types/accountTypes';
import accountOverview from '../../dbNew/accountOverview.json';

export const getAccountOverview = (): AccountOverview => {
  return accountOverview as any as AccountOverview;
};
