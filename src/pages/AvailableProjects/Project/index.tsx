import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectInfo } from './ProjectInfo';
import './style.css';

export const Project = ({ project }: { project: ProjectListItem }) => {
  return (
    <div className='card project-wrapper'>
      <div className='card-body container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <img src={project.thumbnailSrc} />
          </div>
          <div className='col-8'>
            <ProjectInfo project={project} />
          </div>
          <div className='col-2'>IMAGE</div>
        </div>
      </div>
    </div>
  );
};
