import * as React from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { useContext, useState } from 'react';
import { Filters } from './Filters';
import { ProjectListFilterType } from './Filters/ProjectListFilterType';
import { Project } from './Project';
import { ProjectListItem } from 'types/projectTypes';

const AvailableProjects = () => {
  const { availableProjects } = useContext(ProjectContext);
  // const [currentAppliedFilters, setCurrentAppliedFilters] =
  //   useState<ProjectListFilterType>();

  const [filteredProjects, setFilteredProjects] =
    useState<ProjectListItem[]>(availableProjects);

  const handleApplyFilters = (filters: ProjectListFilterType) => {
    console.log('filters updated');
    setFilteredProjects(
      availableProjects.filter((p) => shouldDisplayProject(p, filters))
    );
  };

  const shouldDisplayProject = (
    project: ProjectListItem,
    currentAppliedFilters: ProjectListFilterType
  ) => {
    let shouldDisplay = true;
    if (currentAppliedFilters?.nameSearch !== undefined) {
      console.log('should display', currentAppliedFilters.nameSearch);
      shouldDisplay =
        shouldDisplay &&
        project.projectTitle.includes(currentAppliedFilters.nameSearch);
    }
    return shouldDisplay;
  };

  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col-12'>
          <Filters onApplyFilters={handleApplyFilters} />
        </div>

        {filteredProjects.length > 0 &&
          filteredProjects.map((p, i) => (
            <div className='col-12' key={`available-project-list-item-${i}`}>
              <Project project={p} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvailableProjects;
