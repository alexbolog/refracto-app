import { getAvailableProjects } from 'apiRequests/backend';
import React, { useEffect } from 'react';
import { ProjectListItem } from 'types/projectTypes';

const useGetAvailableProjects = () => {
  const [activeProjectInvestments, setActiveProjectInvestments] =
    React.useState<ProjectListItem[]>([]);

  useEffect(() => {
    updateProjects();
    const interval = setInterval(() => {
      updateProjects();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateProjects = () => {
    getAvailableProjects().then((res) => setActiveProjectInvestments(res));
  };

  return activeProjectInvestments;
};

export default useGetAvailableProjects;
