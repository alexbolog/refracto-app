import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';

export const Sponsor = ({ project }: { project: FullProjectPageDetails }) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Sponsor</h1>
      </div>
      <div className='card-body'>
        <h6>{project.sponsorInfo}</h6>
      </div>
    </div>
  );
};
