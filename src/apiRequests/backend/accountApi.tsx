import { AccountOverview } from 'types/accountTypes';
import accountOverview from '../../dbNew/accountOverview.json';

export const getAccountOverview = (): AccountOverview => {
  console.log(accountOverview);
  console.log(accountOverview as any);
  console.log(accountOverview as any as AccountOverview);
  return accountOverview as any as AccountOverview;
};
