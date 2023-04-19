import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { MobileCollapsibleSection } from './MobileCollapsibleSection';

export const ProjectDetails = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
    <MobileCollapsibleSection
      header='Project Details'
      body={<h6>{project.projectDetails}</h6>}
    />
  );
};
