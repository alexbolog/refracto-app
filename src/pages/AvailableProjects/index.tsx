import * as React from 'react';
import { ProjectContext } from 'contexts/ProjectContext';
import { useContext } from 'react';
import { Filters } from './Filters';
import { ProjectListFilterType } from './Filters/ProjectListFilterType';
import { Project } from './Project';

const AvailableProjects = () => {
  const { availableProjects } = useContext(ProjectContext);

  const handleApplyFilters = (filters: ProjectListFilterType) => {
    //
  };
  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col-12'>
          <Filters onApplyFilters={handleApplyFilters} />
        </div>

        {availableProjects.length > 0 &&
          availableProjects.map((p, i) => (
            <div className='col-12' key={`available-project-list-item-${i}`}>
              <Project project={p} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvailableProjects;
