import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from './MobileCollapsibleSection';

export const Location = ({ project }: { project: FullProjectPageDetails }) => {
  return (
    <MobileCollapsibleSection
      header='Location'
      body={
        <div className='d-flex justify-content-center'>
          {/* <h6>
            {project.location.x},{project.location.y}
          </h6> */}
          <img src='coordinates-map.png' />
        </div>
      }
    />
  );
};
