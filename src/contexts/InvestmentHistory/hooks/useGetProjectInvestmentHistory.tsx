import ProjectInvestmentHistory from '../../../types/projectInvestmentHistory';
import React from 'react';
import { getProjectInvestmentHistory } from '../../../apiRequests/backend/projectInvestmentHistoryApi';

export const useGetProjectInvestmentHistory =
  (): ProjectInvestmentHistory[] => {
    const [projectInvestmentHistory, setProjectInvestmentHistory] =
      React.useState<ProjectInvestmentHistory[]>(getProjectInvestmentHistory());

    return projectInvestmentHistory;
  };
