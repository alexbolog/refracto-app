import * as React from 'react';
import projectList from '../../db/projectList.json';
import { Filters } from './Filters';
import { ProjectListFilterType } from './Filters/ProjectListFilterType';

const AvailableProjects = () => {
  const [projectInfo, setProjectInfo] = React.useState<any[]>([]);

  React.useEffect(() => {
    const data = projectList;
    setProjectInfo(data);
  }, []);

  const handleApplyFilters = (filters: ProjectListFilterType) => {
    //
  };
  return (
    <div className='container-fluid w-100 p-0'>
      <div className='row'>
        <div className='col-12'>
          <Filters onApplyFilters={handleApplyFilters} />
        </div>
      </div>
    </div>
  );
};

export default AvailableProjects;
