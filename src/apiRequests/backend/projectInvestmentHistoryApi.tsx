import ProjectInvestmentHistory from '../../types/projectInvestmentHistory';
import projectInvestmentHistory from '../../dbNew/projectInvestmentHistory.json';

export const getProjectInvestmentHistory = (): ProjectInvestmentHistory[] => {
  return projectInvestmentHistory.map((projectInvestment: any) => {
    projectInvestment = projectInvestment as ProjectInvestmentHistory;
    return projectInvestment;
  });
};
