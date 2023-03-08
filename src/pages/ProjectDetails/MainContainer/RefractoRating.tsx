import React from 'react';
import { ProjectPageDetails } from 'types/projectTypes';

export const RefractoRating = ({
  project
}: {
  project: ProjectPageDetails;
}) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Refracto Rating</h1>
      </div>
      <div className='card-body'>
        <div className='w-100 rating-box'>
          <div
            className={`rating low ${
              project.riskRatingLevel.includes('Low') ? 'active' : ''
            }`}
          >
            Low Risk
          </div>
          <div
            className={`rating med ${
              project.riskRatingLevel.includes('Med') ? 'active' : ''
            }`}
          >
            Medium Risk
          </div>
          <div
            className={`rating high ${
              project.riskRatingLevel.includes('High') ? 'active' : ''
            }`}
          >
            High Risk
          </div>
        </div>
      </div>
    </div>
  );
};
