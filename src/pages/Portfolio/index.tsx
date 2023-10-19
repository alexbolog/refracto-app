import {
  FavoriteProjectCarousel,
  SuggestedProjectsCarousel
} from 'components/ProjectCardCarousel';
import * as React from 'react';
import GeneralStatisticsGraph from './GeneralStatisticsGraph';
import ProjectList from './ProjectList';

const Portfolio = () => {
  return (
    <>
      {/* <div className='row'>
        <div className='col-12 d-flex justify-content-center overlay-wrapper'>
          <div className='overlay rounded'>
            <div className='overlay-content'>Coming soon</div>
          </div>
          <GeneralStatisticsGraph />
        </div>
      </div> */}

      <div className='row'>
        <div className='col-12 d-flex justify-content-center'>
          <ProjectList />
        </div>
      </div>

      <div className='row'>
        <FavoriteProjectCarousel />
      </div>
      <div className='row overlay-wrapper'>
        <div className='overlay rounded'>
          <div className='overlay-content'>Coming soon</div>
        </div>
        <SuggestedProjectsCarousel />
      </div>
    </>
  );
};

export default Portfolio;
