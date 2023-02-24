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

      <div className='row'>
        <FavoriteProjectCarousel />
      </div>
      <div className='row'>
        <SuggestedProjectsCarousel />
      </div>
    </>
  );
};

export default Portfolio;
