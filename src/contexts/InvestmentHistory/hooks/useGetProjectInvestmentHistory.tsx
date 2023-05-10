import ProjectInvestmentEvent from '../../../types/projectInvestmentEvent';
import React from 'react';
import { getProjectInvestmentHistory } from '../../../apiRequests/backend/projectInvestmentHistoryApi';

export const useGetProjectInvestmentHistory = (): ProjectInvestmentEvent[] => {
  const [projectInvestmentHistory, setProjectInvestmentHistory] =
    React.useState<ProjectInvestmentEvent[]>(getProjectInvestmentHistory());

  return projectInvestmentHistory;
};
