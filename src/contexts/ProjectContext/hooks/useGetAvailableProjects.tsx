import { getAvailableProjects } from 'apiRequests/backend';
import React from 'react';
import { ProjectListItem } from 'types/projectTypes';

const useGetAvailableProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<ProjectListItem[]>(getAvailableProjects());

  return activeProjectInvestments;
};

export default useGetAvailableProjects;
