import * as React from 'react';
import ProjectList from './ProjectList';

const Projects = () => {
  const [projectInfo, setProjectInfo] = React.useState<any[]>([]);

  React.useEffect(() => {
    const data = [
      {
        id: 1,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: '5-Story Shopping Mall',
        location: 'Bucharest, RO',
        countryFlagImg:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/23px-Flag_of_Romania.svg.png',
        shortDescription: '',
        longDescription: '',
        deadline: 1723194593000,
        crowdfundingDeadline: '',
        projectOwner: 'EuFacMalluri S.R.L.', // constructor
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
        id: 2,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: 'Office Building',
        location: 'Wien, AU',
        countryFlagImg:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/23px-Flag_of_Austria.svg.png',
        shortDescription: '',
        longDescription: '',
        deadline: 1723194593000,
        crowdfundingDeadline: '',
        projectOwner: 'RandomSRLHere S.R.L.', // constructor
        crowdfundingTarget: 1000000,
        progress: 0.89,
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
        id: 3,
        img: 'http://tysonibele.com/Main/BuildingGenerator/buildingGen_14_09.jpg',
        name: 'Residential Complex',
        location: 'Budapest, HU',
        countryFlagImg:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/23px-Flag_of_Hungary.svg.png',
        shortDescription: '',
        longDescription: '',
        deadline: 1723194593000,
        crowdfundingDeadline: '',
        projectOwner: 'Foreign Constructor Ltd.', // constructor
        crowdfundingTarget: 1000000,
        progress: 0.1,
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
    <div className='container'>
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
