import React from 'react';
import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import { toLocaleStringOptions } from 'config';
import { AccountContext } from 'contexts/AccountContext';
import './style.scss';

const GeneralInvestmentStatistics = () => {
  const { accountOverview } = React.useContext(AccountContext);
  return (
    <>
      <div className='col-lg-4 col-md-12 col-sm-12 dashboard-stat-cards balance-stat-card'>
        <SimpleCardWidget
          title={'Available Balance'}
          content={`€${(accountOverview?.availableBalance ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'Stablecoins in your wallet which can be invested'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12 dashboard-stat-cards total-stat-card'>
        <SimpleCardWidget
          title={'Account Value'}
          content={`€${(accountOverview?.accountValue ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'Total value of your investments on Refracto'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12 dashboard-stat-cards invested-stat-card'>
        <SimpleCardWidget
          title={'Committed Funds'}
          content={`€${(accountOverview?.committedfunds ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'Funds currently invested in projects on Refracto'}
        />
      </div>
    </>
  );
};

export default GeneralInvestmentStatistics;
