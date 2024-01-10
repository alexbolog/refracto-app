import * as React from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { useContext, useState } from 'react';
import { Project } from './Project';
import { ProjectListItem } from 'types/projectTypes';
import { ReactComponent as EmptyPageScreen } from './../../assets/icons/refracto/empty-page-available-projects.svg';
import { FiltersV2 } from 'components/FiltersV2';
import useGetProjects from 'contexts/ProjectContext/hooks/useGetProjects';

const AvailableProjects = () => {
  const { activeProjects } = useGetProjects();

  const [filteredProjects, setFilteredProjects] =
    useState<ProjectListItem[]>(activeProjects);

  const handleApplyFilters = (filteredItems: ProjectListItem[]) => {
    setFilteredProjects(filteredItems);
  };

  React.useEffect(() => {
    setFilteredProjects(activeProjects);
  }, [activeProjects]);

  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        {activeProjects.length > 0 && (
          <div className='col-12'>
            <FiltersV2
              items={activeProjects}
              onFilterChange={handleApplyFilters}
            />
          </div>
        )}
        {activeProjects.length === 0 && (
          <div className='col-12'>
            <h1>Available Projects</h1>
          </div>
        )}

        {filteredProjects.length > 0 &&
          filteredProjects.map((p, i) => (
            <div
              className='col-12'
              key={`available-project-list-item-${i}-${p.projectId}`}
            >
              <Project project={p} />
            </div>
          ))}
        {(filteredProjects.length === 0 || activeProjects.length === 0) && (
          <>
            <div className='col-12 text-center mb-5 mt-5'>
              {activeProjects.length > 0
                ? 'Uh oh! Seems like no project is matching your filters'
                : 'Ups! Please come back later. More projects coming soon.'}
            </div>
            <div className='col-12 text-center'>
              {activeProjects.length === 0 && (
                <h1 className='text-primary' role='button'>
                  Meanwhile, Check Our Demo!
                </h1>
              )}
            </div>
            <div className='col-12 text-center'>
              <EmptyPageScreen className='img-responsive' />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AvailableProjects;
