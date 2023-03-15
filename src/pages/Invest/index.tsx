import React, { useState, useEffect } from 'react';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import { ProjectPageDetails } from 'types/projectTypes';

export const Invest = () => {
  const getProjectId = () => {
    const pathItems = document.location.pathname.split('/');
    console.log(pathItems);
    if (pathItems.length === 3) {
      return pathItems[2];
    }
    return '';
  };
  const [projectId, _] = useState(getProjectId());
  const getProjectById = useGetProjectById();
  useEffect(() => {
    getProjectById(projectId).then((res) => {
      setProjectDetails(res);
    });
  }, [projectId]);

  const [projectDetails, setProjectDetails] = useState<ProjectPageDetails>();
  return <></>;
};
