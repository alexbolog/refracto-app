import { toLocaleStringOptions } from 'config';
import React, { useState } from 'react';
import { RepaymentScheduleEntry } from 'types/projectTypes';
import { formatIso } from 'utils';
import './style.css';

export const RepaymentScheduleTable = ({
  items
}: {
  items: RepaymentScheduleEntry[];
}) => {
  const totalScheduled = 0;
  const totalPaid = 0;

  const paymentStatusPillStyling = (status: string) => {
    let baseStyle = 'badge badge-pill ';
    switch (status) {
      case 'Done':
        baseStyle += 'badge-success';
        break;
      case 'Delayed':
        baseStyle += 'badge-danger';
        break;
      case 'Not processed':
        baseStyle += 'badge-light text-dark';
        break;
    }

    return baseStyle;
  };

  return (
    <div className='table-responsive'>
      <table className='table table-responsive-sm'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Late fees</th>
            <th>Total Scheduled</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={`repayment-schedule-entry_${idx}`}>
              <td>{formatIso(row.date)}</td>
              <td>
                <span className={paymentStatusPillStyling(row.paymentStatus)}>
                  {row.paymentStatus}
                </span>
              </td>
              <td>
                {row.principalAmount.toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
              </td>
              <td>
                {row.interestAmount.toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
              </td>
              <td>
                {row.lateFees.toLocaleString(undefined, toLocaleStringOptions)}
              </td>
              <td>
                {(row.principalAmount + row.interestAmount).toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
              </td>
              <td>{(0).toLocaleString(undefined, toLocaleStringOptions)}</td>
            </tr>
          ))}
          <tr className='last-row'>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              {totalScheduled.toLocaleString(undefined, toLocaleStringOptions)}
            </td>
            <td>
              {totalPaid.toLocaleString(undefined, toLocaleStringOptions)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  // return (
  //   <div className='capital-structure-table-wrapper'>
  //     <div className='capital-structure-table-row'>
  //       <div className='t-header'>Type</div>
  //       <div className='t-header'>Source</div>
  //       <div className='t-header'>% of total</div>
  //       <div className='t-header'>Amount</div>
  //     </div>
  //     {/* {items.map((r, idx) => (
  //       <div
  //         className='capital-structure-table-row'
  //         key={`capital-structure-key-${idx}`}
  //       >
  //         <div className='type'>{r.type}</div>
  //         <div className='source'>{r.source}</div>
  //         <div className='percentage'>
  //           {((r.amount / totalSum) * 100).toLocaleString(
  //             undefined,
  //             toLocaleStringOptions
  //           )}
  //           %
  //         </div>
  //         <div className='amount'>
  //           {r.amount.toLocaleString(undefined, toLocaleStringOptions)}€
  //         </div>
  //       </div>
  //     ))} */}
  //     <div className='capital-structure-table-row total'>
  //       <div className='type' style={{ fontWeight: 700 }}>
  //         Total
  //       </div>
  //       <div className='source'></div>
  //       <div className='percentage'>100.00%</div>
  //       <div className='amount'>
  //         {/* {totalSum.toLocaleString(undefined, toLocaleStringOptions)}€ */}
  //       </div>
  //     </div>
  //   </div>
  // );
};
