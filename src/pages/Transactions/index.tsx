import { FiltersV2 } from 'components/FiltersV2';
import React, { useContext } from 'react';
import { TransactionsTable } from './TransactionsTable';
import { AccountContext } from 'contexts/AccountContext';
import { ExportFooter } from './ExportFooter';
import './style.css';
import { Table } from 'components/Table';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import {
  InvestmentTransaction,
  InvestmentTransactionStatus
} from 'types/accountTypes';
import { formatDate } from 'utils';
import { DateTime } from 'luxon';
import { toLocaleStringOptions } from 'config';
const getStatusClass = (status: InvestmentTransactionStatus) => {
  switch (status) {
    case InvestmentTransactionStatus.Finished:
      return 'status-finished';
    case InvestmentTransactionStatus.Pending:
      return 'status-pending';
    default:
      return 'status-cancelled';
  }
};
const columns: ColumnDef<InvestmentTransaction>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: (row) => {
      return (
        <>
          {formatDate(
            DateTime.fromISO(row.getValue() as string),
            DateTime.DATETIME_SHORT
          )}
        </>
      );
    }
    // cell: (value) => value.getValue() //new Date().toLocaleDateString(),  // format the ISO date string as a local date string
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (row) => {
      return (
        <div
          className={`status ${getStatusClass(
            row.getValue() as InvestmentTransactionStatus
          )}`}
        >
          {
            InvestmentTransactionStatus[
              row.getValue() as InvestmentTransactionStatus
            ]
          }
        </div>
      );
    }
    // Cell: ({ value }) => InvestmentTransactionStatus[value],  // convert enum value to string
  },
  {
    header: 'Project Name',
    accessorKey: 'projectName'
  },
  {
    header: (_) => <div className='td-center'>Currency</div>,
    accessorKey: 'currency',
    cell: (row) => {
      return <div className='td-center'>{row.getValue() as string}</div>;
    }
  },
  {
    header: (_) => <div className='td-center'>Amount</div>,
    accessorKey: 'amount',
    cell: (row) => {
      return (
        <div className='td-center'>
          {(row.getValue() as number).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}
        </div>
      );
    }
  },
  {
    header: (_) => <div className='td-center'>Type</div>,
    accessorKey: 'type',
    cell: (row) => {
      return (
        <div className='td-center status status-pending'>
          {row.getValue() as string}
        </div>
      );
    }
  },
  {
    header: (_) => <div className='td-center'>Operation</div>,
    accessorKey: 'operation',
    cell: (row) => <div className='td-center'>{row.getValue() as string}</div>
  },
  {
    header: 'Description',
    accessorKey: 'description'
  },
  {
    header: 'Transaction Hash',
    accessorKey: 'transactionHash',
    cell: (row) => {
      return (
        <a
          href={`https://explorer.multiversx.com/transactions/${row.getValue()}`}
          target='_blank'
          rel='noreferrer'
          className='btn btn-primary w-100 btn-sm'
        >
          See transaction
        </a>
      );
    }
  }
];
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
          {/* <TransactionsTable transactions={investmentTransactions} /> */}
          <Table columns={columns} data={investmentTransactions} />
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
