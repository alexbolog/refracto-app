import React from 'react';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProjectPageDetails } from 'types/projectTypes';
import { ImageGallery } from 'components/ImageGallery';

export const HeaderCard = ({ project }: { project: ProjectPageDetails }) => {
  return (
    <div className='card project-details-header-card'>
      <div className='card-header b-0'>
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
      <div className='card-body'>
        <ImageGallery images={project.images} />
        <div className='d-flex'>
          <button className='btn btn-social fb-sm'>
            <FontAwesomeIcon icon={faFacebook as any} />
          </button>
          <button className='btn btn-social twt-sm'>
            <FontAwesomeIcon icon={faTwitter as any} />
          </button>
        </div>
      </div>
    </div>
  );
};
