import React, { useState } from 'react';
import { FiltersV2 } from 'components/FiltersV2';
import { useContext } from 'react';
import { columns } from './TransactionsTable';
import { AccountContext } from 'contexts/AccountContext';
import { ExportFooter } from './ExportFooter';
import './style.css';
import { Table } from 'components/Table';

const Transactions = () => {
  const { investmentTransactions } = useContext(AccountContext);
  const [filteredTransactions, setFilteredTransactions] = useState(
    investmentTransactions
  );
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
            items={investmentTransactions ?? []}
            onFilterChange={(newItems) => setFilteredTransactions(newItems)}
            filters={[]}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-4'>
          <Table columns={columns} data={filteredTransactions} isHeightLimited />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <ExportFooter />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
