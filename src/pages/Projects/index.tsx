import * as React from 'react';
import ProjectList from './ProjectList';

const Projects = () => {
  const [projectInfo, setProjectInfo] = React.useState<any[]>([]);

  React.useEffect(() => {
    const data = [
      {
        id: 1,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: 'Proj 1',
        shortDescription: '',
        longDescription: '',
        deadline: '',
        crowdfundingDeadline: '',
        projectOwner: 'MegaConstruct', // constructor
        crowdfundingTarget: 1000000,
        progress: 0.66,
        forecastedAPR: 12.13,
        riskScore: 1,
        isLive: true,
        galleryImages: ['', '', ''],
        attributes: [
          {
            key: '',
            value: 1
          }
        ]
      },
      {
        id: 1,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: 'Proj 1',
        shortDescription: '',
        longDescription: '',
        deadline: '',
        crowdfundingDeadline: '',
        projectOwner: 'MegaConstruct', // constructor
        crowdfundingTarget: 1000000,
        progress: 0.66,
        forecastedAPR: 12.13,
        riskScore: 1,
        galleryImages: ['', '', ''],
        attributes: [
          {
            key: '',
            value: 1
          }
        ]
      },
      {
        id: 1,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: 'Proj 1',
        shortDescription: '',
        longDescription: '',
        deadline: '',
        crowdfundingDeadline: '',
        projectOwner: 'MegaConstruct', // constructor
        crowdfundingTarget: 1000000,
        progress: 0.66,
        forecastedAPR: 12.13,
        riskScore: 1,
        galleryImages: ['', '', ''],
        attributes: [
          {
            key: '',
            value: 1
          }
        ]
      }
    ];
    setProjectInfo(data);
  }, []);

  return (
    <div className='container py-4'>
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
