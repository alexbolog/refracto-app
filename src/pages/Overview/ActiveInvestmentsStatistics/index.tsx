import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import { toLocaleStringOptions } from 'config';
import { AccountContext } from 'contexts/AccountContext';
import React from 'react';

const ActiveInvestmentsStatistics = () => {
  const { accountOverview } = React.useContext(AccountContext);
  return (
    <>
      <div className='col-sm-12 d-flex justify-content-start'>
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
          infoMessage={'Total invested tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Returned to Date'}
          content={`€${(
            accountOverview?.activeInvestments?.returnedToDate ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={'Returned to date tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Lifetime Return of Investment'}
          content={`${(
            (accountOverview?.activeInvestments?.lifetimeReturn ?? 0) * 100
          ).toLocaleString(undefined, toLocaleStringOptions)}%`}
          infoMessage={'lifetime return tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Return'}
          content={`€${(
            accountOverview?.activeInvestments?.expectedTotalReturn ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={'expected total return tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Profit'}
          content={`€${(
            accountOverview?.activeInvestments?.expectedTotalProfit ?? 0
          ).toLocaleString(undefined, toLocaleStringOptions)}`}
          infoMessage={'expected total profit tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Average Expected Return'}
          content={`${(
            (accountOverview?.activeInvestments?.averageExpectedReturn ?? 0) *
            100
          ).toLocaleString(undefined, toLocaleStringOptions)}%`}
          infoMessage={'avg expected return tooltip message'}
        />
      </div>
    </>
  );
};

export default ActiveInvestmentsStatistics;
