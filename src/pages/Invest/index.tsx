import React, { useState, useEffect } from 'react';
import useGetProjectById from 'contexts/ProjectContext/hooks/useGetProjectById';
import { ProjectPageDetails } from 'types/projectTypes';
import { Link } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routeNames } from 'routes';
import { ImageGallery } from 'components/ImageGallery';
import { ProjectDetailsCard } from './ProjectDetailsCard';
import { ProjectSpecs } from 'components/ProjectSpecs';
import { InvestmentCard } from './InvestmentCard';
import './style.css';

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