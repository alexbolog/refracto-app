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
    setFilteredProjects(
      availableProjects.filter((p) => shouldDisplayProject(p, filters))
    );
  };

  const shouldDisplayProject = (
    project: ProjectListItem,
    currentAppliedFilters: ProjectListFilterType
  ) => {
    let shouldDisplay = true;
    if (currentAppliedFilters.nameSearch !== undefined) {
      shouldDisplay =
        shouldDisplay &&
        project.projectTitle.includes(currentAppliedFilters.nameSearch);
    }
    if (currentAppliedFilters.minReturnRange !== undefined) {
      shouldDisplay =
        shouldDisplay &&
        project.returnPercentage * 100 >= currentAppliedFilters.minReturnRange;
    }
    if (currentAppliedFilters.maxReturnRange !== undefined) {
      shouldDisplay =
        shouldDisplay &&
        project.returnPercentage * 100 <= currentAppliedFilters.maxReturnRange;
    }
    if (
      currentAppliedFilters.riskRatingLevels !== undefined &&
      currentAppliedFilters.riskRatingLevels.length > 0 &&
      currentAppliedFilters.riskRatingLevels.length < 3
    ) {
      const riskLevelCheck =
        currentAppliedFilters.riskRatingLevels.filter((lvl: string) =>
          project.riskRatingLevel.includes(lvl)
        ).length > 0;
      shouldDisplay = shouldDisplay && riskLevelCheck;
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
