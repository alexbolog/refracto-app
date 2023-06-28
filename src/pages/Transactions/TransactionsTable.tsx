import { toLocaleStringOptions } from 'config';
import { DateTime } from 'luxon';
import React from 'react';
import {
  InvestmentTransaction,
  InvestmentTransactionStatus
} from 'types/accountTypes';
import { formatDate } from 'utils';

export const TransactionsTable = ({
  transactions
}: {
  transactions: InvestmentTransaction[];
}) => {
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

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='table-responsive'>
          <div className='transactions-table'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col' className='date'>
                    Date
                  </th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Project Name</th>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Currency</th>
                  <th scope='col'>Type</th>
                  <th scope='col'>Operation</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Transaction</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, index) => (
                  <tr
                    key={`investment-transactions-${index}-${tx.transactionHash}`}
                  >
                    <th scope='row'>
                      {formatDate(
                        DateTime.fromISO(tx.date),
                        DateTime.DATETIME_SHORT
                      )}
                    </th>
                    <td>
                      <div className={`status ${getStatusClass(tx.status)}`}>
                        {InvestmentTransactionStatus[tx.status]}
                      </div>
                    </td>
                    <td>{tx.projectName}</td>
                    <td>
                      <div className='td-center'>
                        {tx.amount.toLocaleString(
                          undefined,
                          toLocaleStringOptions
                        )}
                      </div>
                    </td>
                    <td>
                      <div className='td-center'>{tx.currency}</div>
                    </td>
                    <td>
                      <div className='td-center status status-pending'>
                        {tx.type}
                      </div>
                    </td>
                    <td>
                      <div className='td-center'>{tx.operation}</div>
                    </td>
                    <td>{tx.description}</td>
                    <td>
                      <button className='btn btn-primary w-100 btn-sm'>
                        See transaction
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
