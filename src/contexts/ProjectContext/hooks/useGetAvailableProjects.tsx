import {
  getAccountOverview,
  getActiveProjectInvestments
} from 'apiRequests/backend/accountApi';
import React from 'react';
import { ActiveProjectInvestment } from 'types/projectTypes';

const useGetAvailableProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<ActiveProjectInvestment[]>(getActiveProjectInvestments());

  return activeProjectInvestments;
};

export default useGetAvailableProjects;
