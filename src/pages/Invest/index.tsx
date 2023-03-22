import React, { useState, useEffect } from 'react';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import { ProjectPageDetails } from 'types/projectTypes';
import { Link } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeNames } from 'routes';
import { ImageGallery } from 'components/ImageGallery';
import { ProjectDetailsCard } from './ProjectDetailsCard';

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
  // TODO: add loading
  return projectDetails === undefined ? null : (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col'>
          <h3 className='breadcrumbs'>
            <Link to={routeNames.home} className='main'>
              <FontAwesomeIcon icon={faChevronLeft} className='sepz' />
              Back to Available Projects
            </Link>
          </h3>
        </div>
      </div>
      <div className='row p-0 w-100'>
        <div className='col-lg-5 p-0'>
          <ProjectDetailsCard projectDetails={projectDetails} />
        </div>
      </div>
    </div>
  );
};
