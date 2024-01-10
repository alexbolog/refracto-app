import React, { useState, useEffect, useContext } from 'react';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import { ProjectPageDetails } from 'types/projectTypes';
import { Link, useNavigate } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeNames } from 'routes';
import { ImageGallery } from 'components/ImageGallery';
import { ProjectDetailsCard } from './ProjectDetailsCard';
import { ProjectSpecs } from 'components/ProjectSpecs';
import { InvestmentCard } from './InvestmentCard';
import './style.css';
import { ProjectContext } from 'contexts/ProjectContext';
import useGetProjects from 'contexts/ProjectContext/hooks/useGetProjects';

export const Invest = () => {
  const getProjectId = () => {
    const pathItems = document.location.pathname.split('/');
    if (pathItems.length === 3) {
      return pathItems[2];
    }
    return '';
  };
  const [projectId, _] = useState(getProjectId());

  const { getProjectById } = useContext(ProjectContext);
  const navigate = useNavigate();

  const { allProjects } = useGetProjects();

  useEffect(() => {
    getProjectById(parseInt(projectId)).then((res) => {
      if (res === undefined) {
        // TODO: add redirect to 404 soon
        // something went wrong
        navigate(routeNames.home);
      }
      setProjectDetails(res);
    });
  }, [projectId, allProjects]);

  const [projectDetails, setProjectDetails] = useState<ProjectPageDetails>();
  // TODO: add loading
  return projectDetails === undefined ? (
    <h1>Loading..</h1>
  ) : (
    <>
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
      <div className='row'>
        <div className='col'>
          <h2>Investment Order</h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-6 col-md-12'>
          <ProjectDetailsCard projectDetails={projectDetails} />
        </div>
        <div className='col-lg-6 col-md-12'>
          <ProjectSpecs project={projectDetails} sm />
          <InvestmentCard project={projectDetails} />
        </div>
      </div>
    </>
  );
};
