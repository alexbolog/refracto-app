import { AccountOverview } from 'types/accountTypes';
import accountOverview from '../../dbNew/accountOverview.json';
import projectDetails from '../../dbNew/projectList.json';

export const getAccountOverview = (): AccountOverview => {
  const response = accountOverview as any as AccountOverview;
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
