import { FiltersV2 } from 'components/FiltersV2';
import React from 'react';
import { TransactionsTable } from './TransactionsTable';

const Transactions = () => {
  return (
    // <div className='row'>
    //   <div className='col-lg-12 col-sm-12 d-flex justify-content-center'>
    //     <h2>Transactions page coming soon</h2>
    //   </div>
    // </div>
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col'>
          <h1>Transactions</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <FiltersV2
            items={[]}
            onFilterChange={function (newItems: any[]): void {
              //
            }}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-4'>
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
