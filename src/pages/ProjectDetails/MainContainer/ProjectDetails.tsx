import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';

export const ProjectDetails = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Project Details</h1>
      </div>
      <div className='card-body'>
        <h6>{project.projectDetails}</h6>
      </div>
    </div>
  );
};
