import * as React from 'react';
import ProjectList from './ProjectList';
import projectList from '../../db/projectList.json';

const Projects = () => {
  const [projectInfo, setProjectInfo] = React.useState<any[]>([]);

  React.useEffect(() => {
    const data = projectList;
    setProjectInfo(data);
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row mb-5'>
        <div className='col d-flex justify-content-center'>
          <h1>Open projects</h1>
        </div>
      </div>
      {projectInfo.length > 0 && <ProjectList projectInfo={projectInfo} />}
    </div>
  );
};

export default Projects;
