import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
<<<<<<< HEAD
import { RepaymentScheduleTable } from './RepaymentScheduleTable';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';
=======
import { Schedule } from './Schedule';
import './style.css';
>>>>>>> e1fb28d (added project types)

export const RepaymentSchedule = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
<<<<<<< HEAD
    <MobileCollapsibleSection
      header='Repayment Schedule'
      body={<RepaymentScheduleTable items={project.repaymentSchedule} />}
    />
=======
    <div className='card executive-summary-wrapper'>
      <div className='card-header'>
        <h1>Repayment Schedule</h1>
      </div>
      <div className='card-body'>
        <Schedule items={project.repaymentSchedule} />
      </div>
    </div>
>>>>>>> e1fb28d (added project types)
  );
};
