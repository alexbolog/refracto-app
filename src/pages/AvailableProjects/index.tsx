import { AccountContext } from 'contexts/AccountContext';
import * as React from 'react';
import { useContext } from 'react';
import { Filters } from './Filters';
import { ProjectListFilterType } from './Filters/ProjectListFilterType';
import { Project } from './Project';

const AvailableProjects = () => {
  const [projectInfo, setProjectInfo] = React.useState<any[]>([]);
  const {} = useContext(AccountContext);
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
          {/* <Project project={projectInfo[0]} /> */}
        </div>
      </div>
    </div>
  );
};

export default AvailableProjects;
