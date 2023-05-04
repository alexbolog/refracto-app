import * as React from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { useContext, useState } from 'react';
import { Filters } from '../../components/Filters';
import { ProjectListFilterType } from '../../components/Filters/ProjectListFilterType';
import { Project } from './Project';
import { ProjectListItem } from 'types/projectTypes';
import { ReactComponent as EmptyPageScreen } from './../../assets/icons/refracto/empty-page-available-projects.svg';
import { DateTime } from 'luxon';
import { shouldDisplayProject } from 'components/Filters/FilterLogic';

const AvailableProjects = () => {
  const { availableProjects } = useContext(ProjectContext);

  const [filteredProjects, setFilteredProjects] =
    useState<ProjectListItem[]>(availableProjects);

  const handleApplyFilters = (filters: ProjectListFilterType) => {
    setFilteredProjects(
      availableProjects.filter((p) => shouldDisplayProject(p, filters))
    );
  };

  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        {availableProjects.length > 0 && (
          <div className='col-12'>
            <Filters onApplyFilters={handleApplyFilters} />
          </div>
        )}
        {availableProjects.length === 0 && (
          <div className='col-12'>
            <h1>Available Projects</h1>
          </div>
        )}

        {filteredProjects.length > 0 &&
          filteredProjects.map((p, i) => (
            <div className='col-12' key={`available-project-list-item-${i}`}>
              <Project project={p} />
            </div>
          ))}
        {(filteredProjects.length === 0 || availableProjects.length === 0) && (
          <>
            <div className='col-12 text-center mb-5 mt-5'>
              {availableProjects.length > 0
                ? 'Uh oh! Seems like no project is matching your filters'
                : 'Ups! Please come back later. More projects coming soon.'}
            </div>
            <div className='col-12 text-center'>
              {availableProjects.length === 0 && (
                <h1 className='text-primary' role='button'>
                  Meanwhile, Check Our Demo!
                </h1>
              )}
            </div>
            <div className='col-12 text-center'>
              <EmptyPageScreen />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AvailableProjects;
