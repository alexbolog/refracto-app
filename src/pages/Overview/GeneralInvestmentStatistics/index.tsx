import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import React from 'react';

const GeneralInvestmentStatistics = () => {
  return (
    <>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Total Invested'}
          content={'€5,789,560'}
          infoMessage={'Total invested tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Returned to Date'}
          content={'€5,789,560'}
          infoMessage={'Returned to date tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Liftetime Return of Investment'}
          content={'40.27%'}
          infoMessage={'lifetime return tooltip message'}
        />
      </div>
    </>
  );
};

export default GeneralInvestmentStatistics;
