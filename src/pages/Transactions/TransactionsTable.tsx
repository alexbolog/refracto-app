import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { toLocaleStringOptions } from 'config';
import { DateTime } from 'luxon';
import {
  InvestmentTransactionStatus,
  InvestmentTransaction
} from 'types/accountTypes';
import { formatDate } from 'utils';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks';

export const getStatusClass = (status: InvestmentTransactionStatus) => {
  switch (status) {
    case InvestmentTransactionStatus.Finished:
      return 'status-finished';
    case InvestmentTransactionStatus.Pending:
      return 'status-pending';
    default:
      return 'status-cancelled';
  }
};

export const useTransactionsTableColumns = () => {
  const { chainID } = useGetNetworkConfig();

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
    },
    {
      header: 'Project Name',
      accessorKey: 'projectTitle'
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
      },
      enableSorting: true
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
            href={`https://${
              chainID === 'T' ? 'testnet-' : chainID === 'D' ? 'devnet-' : ''
            }explorer.multiversx.com/transactions/${row.getValue()}`}
            target='_blank'
            rel='noreferrer'
            className='btn btn-primary w-100 btn-sm'
          >
            See transaction
          </a>
        );
      },
      enableSorting: false
    }
  ];

  return columns;
};
