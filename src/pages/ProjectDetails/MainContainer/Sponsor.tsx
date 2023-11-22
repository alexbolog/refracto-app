import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from './MobileCollapsibleSection';

export const Sponsor = ({ project }: { project: FullProjectPageDetails }) => {
  return (
    <MobileCollapsibleSection
      header='Sponsor'
      body={
        <h6>
          {project.sponsorInfo.split('<br />').map((str, i) => (
            <>
              {str}
              <br />
            </>
          ))}
        </h6>
      }
    />
  );
};
