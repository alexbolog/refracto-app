import { toLocaleStringOptions } from 'config';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import {
  CapitalStructureItem,
  RepaymentScheduleEntry
} from 'types/projectTypes';
import { formatIso } from 'utils';

export const Schedule = ({ items }: { items: RepaymentScheduleEntry[] }) => {
  const [totalSums, _] = useState({
    scheduled: items.reduce(
      (prev, crt) => (prev += crt.interestAmount + crt.principalAmount),
      0
    ),
    paid: items.reduce((prev, crt) => (prev += crt.paid ?? 0), 0)
  });

  const getStatusType = (status: string) => {
    if (status.includes('Done')) {
      return 'success';
    }
    if (status.includes('Delay')) {
      return 'warning';
    }
    return 'pending';
  };
  return (
    <div className='schedule-table-wrapper'>
      <div className='schedule-table-row'>
        <div className='t-col t-header'>Date</div>
        <div className='t-col long t-header'>Status</div>
        <div className='t-col t-header'>Principal</div>
        <div className='t-col t-header'>Interest</div>
        <div className='t-col t-header'>Late fees</div>
        <div className='t-col t-header'>Total Scheduled</div>
        <div className='t-col t-header'>Paid</div>
      </div>
      {items.map((r, idx) => (
        <div
          className='schedule-table-row'
          key={`repayment-schedule-key-${idx}`}
        >
          <div className='t-col'>{formatIso(r.date, DateTime.DATE_SHORT)}</div>
          <div className='t-col long'>
            <div className={`status ${getStatusType(r.paymentStatus)}`}>
              {r.paymentStatus}
            </div>
          </div>
          <div className='t-col'>
            {r.principalAmount.toLocaleString(undefined, toLocaleStringOptions)}
          </div>
          <div className='t-col'>
            {r.interestAmount.toLocaleString(undefined, toLocaleStringOptions)}
          </div>
          <div className='t-col'>
            {r.lateFees.toLocaleString(undefined, toLocaleStringOptions)}
          </div>
          <div className='t-col'>
            {(r.principalAmount + r.interestAmount).toLocaleString(
              undefined,
              toLocaleStringOptions
            )}
          </div>
          <div className='t-col'>
            {(r.paid ?? 0).toLocaleString(undefined, toLocaleStringOptions)}
          </div>
        </div>
      ))}
      <div className='schedule-table-row total'>
        <div className='t-col'>Total</div>
        <div className='t-col'>
          {totalSums.scheduled.toLocaleString(undefined, toLocaleStringOptions)}
        </div>
        <div className='t-col'>
          {totalSums.paid.toLocaleString(undefined, toLocaleStringOptions)}
        </div>
      </div>
    </div>
  );
};
