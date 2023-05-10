import ProjectInvestmentEvent from '../../types/projectInvestmentEvent';
import projectInvestmentHistory from '../../dbNew/projectInvestmentHistory.json';

export const getProjectInvestmentHistory = (): ProjectInvestmentEvent[] => {
  return projectInvestmentHistory.map((projectInvestment: any) => {
    projectInvestment = projectInvestment as ProjectInvestmentEvent;
    return projectInvestment;
  });
};
