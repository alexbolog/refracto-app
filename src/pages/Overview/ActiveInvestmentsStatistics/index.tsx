import React from 'react';
import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import { toLocaleStringOptions } from 'config';
import { AccountContext } from 'contexts/AccountContext';

const ActiveInvestmentsStatistics = () => {
  const { accountOverview } = React.useContext(AccountContext);
  return (
    <>
      <div className='col-12 d-flex justify-content-start'>
        <h3>
          <strong>Active Investments Statistics</strong>
        </h3>
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Total Invested'}
          content={`€${(
            accountOverview?.activeInvestments?.totalInvested ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={
            'The total amount of funds invested in projects on Refracto since you started'
          }
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Returned to Date'}
          content={`€${(
            accountOverview?.activeInvestments?.returnedToDate ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={
            'The total amount of profit you have obtained using Refracto since you started'
          }
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Lifetime Return of Investment'}
          content={`${(
            (accountOverview?.activeInvestments?.lifetimeReturn ?? 0) * 100
          ).toLocaleString(undefined, toLocaleStringOptions)}%`}
          infoMessage={
            'The average return on investment across all your investments on Refracto since you started'
          }
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Return'}
          content={`€${(
            accountOverview?.activeInvestments?.expectedTotalReturn ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={
            'The amount you will receive once all your active investments are completed'
          }
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Profit'}
          content={`€${(
            accountOverview?.activeInvestments?.expectedTotalProfit ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={
            'The total profit you will receive once all your active investments are completed'
          }
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Average Expected Return'}
          content={`${(
            (accountOverview?.activeInvestments?.averageExpectedReturn ?? 0) *
            100
          ).toLocaleString(undefined, toLocaleStringOptions)}%`}
          infoMessage={
            'The average percentage return on investment you will receive from your active investments'
          }
        />
      </div>
    </>
  );
};

export default ActiveInvestmentsStatistics;
