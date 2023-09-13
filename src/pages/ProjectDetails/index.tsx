import React, { useEffect, useState } from 'react';
import { ProjectPageDetails } from 'types/projectTypes';
import { ProjectDetailsLayout } from './Layout';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import './style.css';

const ProjectDetails = () => {
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
    getProjectById(parseInt(projectId)).then((res) => {
      setProjectDetails(res);
    });
  }, [projectId]);

  const [projectDetails, setProjectDetails] = useState<ProjectPageDetails>();

  //TODO: add loading screen
  return projectDetails === undefined ? null : (
    <ProjectDetailsLayout project={projectDetails} />
  );
};

export default ProjectDetails;
