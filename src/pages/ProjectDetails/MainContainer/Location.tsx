import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';

export const Location = ({ project }: { project: FullProjectPageDetails }) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Location</h1>
      </div>
      <div className='card-body'>
        <h6>
          {project.location.X},{project.location.Y}
        </h6>
      </div>
    </div>
  );
};
