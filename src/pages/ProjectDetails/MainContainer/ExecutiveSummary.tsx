import React from 'react';
import { ProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from './MobileCollapsibleSection';

export const ExecutiveSummary = ({
  project
}: {
  project: ProjectPageDetails;
}) => {
  return (
    <MobileCollapsibleSection
      header='Executive Summary'
      body={
        <h6>
          {project.executiveSummary.split('<br />').map((str, i) => (
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
