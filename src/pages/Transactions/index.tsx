import { FiltersV2 } from 'components/FiltersV2';
import React, { useContext } from 'react';
import { TransactionsTable } from './TransactionsTable';
import { AccountContext } from 'contexts/AccountContext';
import './style.css';

const Transactions = () => {
  const { investmentTransactions } = useContext(AccountContext);
  return (
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
          <TransactionsTable transactions={investmentTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
