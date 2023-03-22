import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { MainContainer } from '../MainContainer';
import { ProjectSpecs } from '../../../components/ProjectSpecs';

export const ProjectDetailsLayout = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col'>
          <h3 className='breadcrumbs'>
            <Link to={routeNames.home} className='main'>
              All Projects
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className='sepz' />
            {project.projectTitle}
          </h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          <MainContainer project={project} />
        </div>
        <div className='col-4 p-0'>
          <ProjectSpecs project={project} />
        </div>
      </div>
    </div>
  );
};
