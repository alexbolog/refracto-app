import { FiltersV2 } from 'components/FiltersV2';
import React, { useContext } from 'react';
import { AgreementsTable } from './AgreementsTable';
import { AccountContext } from 'contexts/AccountContext';
import './style.css';

export const Agreements = () => {
  const { investmentTransactions } = useContext(AccountContext);
  return (
    <div className='container-fluid p-0'>
      <div className='row'>
        <div className='col'>
          <h1>Agreements</h1>
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
          <AgreementsTable agreements={investmentTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Agreements;
