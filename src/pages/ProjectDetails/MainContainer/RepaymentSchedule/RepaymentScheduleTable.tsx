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
  const totalScheduled = items.reduce(
    (prev, crt) => (prev += crt.interestAmount + crt.principalAmount),
    0
  );
  const totalPaid = items
    .filter((i) => i.paymentStatus === 'Done')
    .reduce(
      (prev, crt) =>
        (prev += crt.interestAmount + crt.principalAmount + crt.lateFees),
      0
    );

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
              <td>
                {(row.paymentStatus === 'Done'
                  ? row.interestAmount + row.principalAmount + row.lateFees
                  : 0
                ).toLocaleString(undefined, toLocaleStringOptions)}
              </td>
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
};
