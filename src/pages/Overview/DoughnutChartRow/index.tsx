import React from 'react';
import DonutChartStatisticsCard from 'components/DonutChartStatisticsCard';

const DoughnutChartRow = () => {
  return (
    <>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <DonutChartStatisticsCard />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <DonutChartStatisticsCard />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <DonutChartStatisticsCard />
      </div>
    </>
  );
};

export default DoughnutChartRow;
