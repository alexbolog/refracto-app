import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import { toLocaleStringOptions } from 'config';
import { GeneralContext } from 'contexts/GeneralContext';
import React from 'react';

const GeneralInvestmentStatistics = () => {
  const { accountOverview } = React.useContext(GeneralContext);
  return (
    <>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Available Balance'}
          content={`€${(accountOverview?.availableBalance ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'available balance tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Account Value'}
          content={`€${(accountOverview?.accountValue ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'Acc value tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Committed Funds'}
          content={`€${(accountOverview?.committedfunds ?? 0).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}`}
          infoMessage={'Committed funds tooltip message'}
        />
      </div>
    </>
  );
};

export default GeneralInvestmentStatistics;
