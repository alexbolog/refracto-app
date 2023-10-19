import React, { useContext } from 'react';
import DonutChartStatisticsCard from 'components/DonutChartStatisticsCard';
import { AccountContext } from '../../../contexts/AccountContext';

const DoughnutChartRow = () => {
  const { accountOverview, isLoading } = useContext(AccountContext);

  console.log('Investments on this account', accountOverview?.investments);

  return (
    <>
      {accountOverview?.investments && (
        <div className='col-lg-4 col-md-12 col-sm-12'>
          <DonutChartStatisticsCard
            investments={accountOverview!.investments}
            title={'Proportion Of Investments'}
          />
        </div>
      )}
      {/*<div className='col-lg-4 col-md-12 col-sm-12'>*/}
      {/*  <DonutChartStatisticsCard />*/}
      {/*</div>*/}
      {/*<div className='col-lg-4 col-md-12 col-sm-12'>*/}
      {/*  <DonutChartStatisticsCard />*/}
      {/*</div>*/}
    </>
  );
};

export default DoughnutChartRow;
