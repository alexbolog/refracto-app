import React from 'react';
import { FullProjectPageDetails } from 'types/projectTypes';
import { RepaymentScheduleTable } from './RepaymentScheduleTable';
import { MobileCollapsibleSection } from '../MobileCollapsibleSection';

export const RepaymentSchedule = ({
  project
}: {
  project: FullProjectPageDetails;
}) => {
  return (
    <MobileCollapsibleSection
      header='Repayment Schedule'
      body={<RepaymentScheduleTable items={project.repaymentSchedule} />}
    />
  );
};
