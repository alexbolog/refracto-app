import { AccountOverview } from 'types/accountTypes';
import accountOverview from '../../dbNew/accountOverview.json';

export const getAvailableProjects = (): AccountOverview => {
  return accountOverview as any as AccountOverview;
};
