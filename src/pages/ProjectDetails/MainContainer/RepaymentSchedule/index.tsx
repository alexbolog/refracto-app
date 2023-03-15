import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
import { RepaymentScheduleTable } from './RepaymentScheduleTable';

export const RepaymentSchedule = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Repayment Schedule</h1>
      </div>
      <div className='card-body'>
        <RepaymentScheduleTable items={project.repaymentSchedule} />
      </div>
    </div>
  );
};
