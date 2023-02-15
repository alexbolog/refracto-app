import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { CFProgressBar } from './CFProgressBar';
import { Deadline } from './ProjectSpecs/Deadline';
import { Goal } from './ProjectSpecs/Goal';
import { Rating } from './ProjectSpecs/Rating';
import { Return } from './ProjectSpecs/Return';

export const ProjectInfo = ({ project }: { project: ProjectListItem }) => {
  return (
    <div className='container-fluid p-0 w-100'>
      <div className='row'>
        <div className='col-12 text-start'>
          <h3 className='project-info-title'>{project.projectTitle}</h3>
        </div>
        <div className='col-12 project-specs-wrapper'>
          <Return value={project.returnPercentage} />
          <Rating value={project.riskRatingLevel} />
          <Goal
            value={project.crowdfundedAmount / project.crowdfundingTarget}
          />
          <Deadline value={project.crowdfundingDeadline} />
        </div>
        <div className='col-12'>
          <CFProgressBar
            crowdfundedAmount={project.crowdfundedAmount}
            crowdfundingTarget={project.crowdfundingTarget}
            deadline={project.crowdfundingDeadline}
          />
        </div>
      </div>
    </div>
  );
};
