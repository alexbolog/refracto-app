import * as React from 'react';
import projectList from '../../db/projectList.json';
import { FilterBox } from './FilterBox';
import { ProjectListFilterType } from './FilterBox/ProjectListFilterType';

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
          <FilterBox onApplyFilters={handleApplyFilters} />
        </div>
      </div>
    </div>
  );
};

export default AvailableProjects;
