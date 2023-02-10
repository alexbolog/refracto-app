import * as React from 'react';
import projectList from '../../db/projectList.json';
import { FilterComponent } from './FilterComponent';
import { ProjectListFilterType } from './FilterComponent/ProjectListFilterType';

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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <FilterComponent onApplyFilters={handleApplyFilters} />
        </div>
      </div>
      {/* {projectInfo.length > 0 && <ProjectList projectInfo={projectInfo} />} */}
    </div>
  );
};

export default AvailableProjects;
