import React, { useContext } from 'react';
import DonutChartStatisticsCard from 'components/DonutChartStatisticsCard';
import { AccountContext } from '../../../contexts/AccountContext';
import { DonutChartType } from '../../../enums';

const DoughnutChartRow = () => {
  const { accountOverview, isLoading } = useContext(AccountContext);

  return (
    <>
      {accountOverview?.investments && (
        <>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <DonutChartStatisticsCard
              investments={accountOverview!.investments}
              title={'Proportion of Investments'}
              type={DonutChartType.INVESTED}
            />
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <DonutChartStatisticsCard
              investments={accountOverview!.investments}
              title={'Expected Return by Projects'}
              type={DonutChartType.ROI}
            />
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <DonutChartStatisticsCard
              investments={accountOverview!.investments}
              title={'Performance'}
              type={DonutChartType.APR}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DoughnutChartRow;
