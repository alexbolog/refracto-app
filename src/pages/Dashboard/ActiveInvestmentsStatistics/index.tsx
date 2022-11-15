import SimpleCardWidget from 'components/CardWidgets/SimpleCardWidget';
import React from 'react';

const ActiveInvestmentsStatistics = () => {
  return (
    <>
      <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-start'>
        <h3>
          <strong>Active Investments Statistics</strong>
        </h3>
      </div>
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
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Return'}
          content={'€5,789,560'}
          infoMessage={'expected total return tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Expected Total Profit'}
          content={'€5,789,560'}
          infoMessage={'expected total profit tooltip message'}
        />
      </div>
      <div className='col-lg-4 col-md-12 col-sm-12'>
        <SimpleCardWidget
          title={'Average Expected Return'}
          content={'28.06%'}
          infoMessage={'avg expected return tooltip message'}
        />
      </div>
    </>
  );
};

export default ActiveInvestmentsStatistics;