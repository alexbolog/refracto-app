import React from 'react';
import { ProjectPageDetails } from 'types/projectTypes';

export const ExecutiveSummary = ({
  project
}: {
  project: ProjectPageDetails;
}) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Executive Summary</h1>
      </div>
      <div className='card-body'>
        <h6>{project.executiveSummary}</h6>
      </div>
    </div>
  );
};
