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
    <div className='row'>
      {/* <div className='col-lg-12'>
        <h3 className='breadcrumbs'>
          <Link to={routeNames.home} className='main'>
            All Projects
          </Link>
          <FontAwesomeIcon icon={faChevronRight} className='sepz' />
          {project.projectTitle}
        </h3>
      </div> */}
      <div className='col-lg-8 col-md-12 col-sm-12'>
        <MainContainer project={project} />
      </div>
      <div className='col-lg-4 p-0 project-specs-floating-panel'>
        <ProjectSpecs project={project} sticky />
      </div>
    </div>
  );
};
