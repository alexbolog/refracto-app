import React, { useContext, useEffect, useState } from 'react';
import { ProjectPageDetails } from 'types/projectTypes';
import { ProjectDetailsLayout } from './Layout';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import './style.css';
import { ProjectContext } from 'contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';

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
  const { getProjectById, availableProjects } = useContext(ProjectContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProjectById(parseInt(projectId)).then((res) => {
      if (res === undefined) {
        // TODO: add redirect to 404 soon
        // something went wrong
        navigate(routeNames.home);
      }
      setProjectDetails(res);
    });
  }, [projectId, availableProjects]);

  const [projectDetails, setProjectDetails] = useState<ProjectPageDetails>();

  //TODO: add loading screen
  return projectDetails === undefined ? (
    <h1>Loading..</h1>
  ) : (
    <ProjectDetailsLayout project={projectDetails} />
  );
};

export default ProjectDetails;
