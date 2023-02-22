import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';

export const MainCard = ({ project }: { project: ProjectPageDetails }) => {
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='main-card-header'>
          <h1>{project.projectTitle}</h1>
          <h6>{project.shortDescription.substring(0, 150)}</h6>
          <button className='btn btn-social fb'>
            <FontAwesomeIcon icon={faFacebook as any} />
          </button>
          <button className='btn btn-social twt'>
            <FontAwesomeIcon icon={faTwitter as any} />
          </button>
        </div>
      </div>
    </div>
  );
};
