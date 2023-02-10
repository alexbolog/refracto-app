import * as React from 'react';
import GeneralStatisticsGraph from './GeneralStatisticsGraph';
import ProjectList from './ProjectList';

const Portfolio = () => {
  return (
    <>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 d-flex justify-content-center'>
          <GeneralStatisticsGraph />
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-12 col-sm-12 d-flex justify-content-center'>
          <ProjectList />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
