import { AccountContext } from 'contexts/AccountContext';
import { ProjectContext } from 'contexts/ProjectContext';
import * as React from 'react';
import { useContext } from 'react';
import { Filters } from './Filters';
import { ProjectListFilterType } from './Filters/ProjectListFilterType';
import { Project } from './Project';

const AvailableProjects = () => {
  const { availableProjects } = useContext(ProjectContext);
  // React.useEffect(() => {
  //   const data = projectList;
  //   setProjectInfo(data);
  // }, []);

  const handleApplyFilters = (filters: ProjectListFilterType) => {
    //
  };
  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col-12'>
          <Filters onApplyFilters={handleApplyFilters} />
        </div>
        <div className='col-12'>
          {availableProjects.length > 0 && (
            <Project project={availableProjects[0]} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableProjects;
