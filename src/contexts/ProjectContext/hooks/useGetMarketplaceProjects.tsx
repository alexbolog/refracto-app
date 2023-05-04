import { getAvailableProjects } from 'apiRequests/backend';
import React from 'react';
import { ProjectListItem } from 'types/projectTypes';

const useGetMarketplaceProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<ProjectListItem[]>(getAvailableProjects());

  return activeProjectInvestments;
};

export default useGetMarketplaceProjects;
