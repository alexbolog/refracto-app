import { AccountOverview, InvestmentTransaction } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import accountOverview from '../../dbNew/accountOverview.json';
import projectDetails from '../../dbNew/projectList.json';
import projectList from '../../dbNew/projectList.json';
import transactionList from '../../dbNew/transactions.json';

export const getAccountOverview = (): AccountOverview => {
  const response = (accountOverview as any) as AccountOverview;
  for (let i = 0; i < response.favoriteProjects.length; i++) {
    response.favoriteProjects[i].projectTitle = projectDetails.filter(
      (pd) => pd.projectId === response.favoriteProjects[i].projectId
    )[0].projectTitle;
  }

  for (let i = 0; i < response.suggestedProjects.length; i++) {
    response.suggestedProjects[i].projectTitle = projectDetails.filter(
      (pd) => pd.projectId === response.suggestedProjects[i].projectId
    )[0].projectTitle;
  }
  return response;
};

export const getActiveProjectInvestments = (): ActiveProjectInvestment[] => {
  return projectList.map((l: any) => {
    const o = l as ActiveProjectInvestment;
    o.amountInvested = 123456.789;
    // o.thumbnailSrc = l.images[0];
    return o;
  });
};

export const getInvestmentTransactions = (): InvestmentTransaction[] => {
  return transactionList.map((tl) => tl as InvestmentTransaction);
};
