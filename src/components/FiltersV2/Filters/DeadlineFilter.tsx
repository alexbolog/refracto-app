import React, { useEffect, useState } from 'react';
import MultiRangeSlider from 'components/MultiRangeSlider';
import { AppliedFilter } from '../AppliedFilter';
import { DateTime } from 'luxon';
import DateRangePicker from 'components/DateRangePicker';
import { Filter } from './Filter';
import { formatDate } from 'utils';

const DeadlineFilter = ({
  onFilterChange
}: {
  onFilterChange: (newState: any) => void;
}) => {
  const onDatePick = (startDate: DateTime, endDate: DateTime) => {
    onFilterChange({ startDate, endDate });
  };
  return (
    <>
      <div className='filter-btn dsk'>
        <DateRangePicker
          onChange={onDatePick}
          customInput='Select Deadline'
          customBtnClassName='btn btn-primary dropdown-toggle dropdown deadline-select'
        ></DateRangePicker>
      </div>
      <div className='filter-btn mbl w-100'>
        <DateRangePicker
          onChange={onDatePick}
          customInput='Select Deadline'
          customBtnClassName='btn btn-primary dropdown-toggle dropdown deadline-select w-100'
        ></DateRangePicker>
      </div>
    </>
  );
};

export const DEADLINE_FILTER: Filter = {
  id: 'deadline-range-filter',
  defaultState: { min: 0, max: 100 },
  filterComponent: (_, onFilterChange) => (
    <DeadlineFilter onFilterChange={onFilterChange} />
  ),
  appliedFilterComponent: (state, resetState) =>
    state.startDate === undefined && state.endDate === undefined ? (
      <></>
    ) : state.startDate !== undefined && state.endDate === undefined ? (
      <AppliedFilter
        filterText='After'
        filterValue={formatDate(state.startDate, DateTime.DATE_SHORT)}
        onRemoveFilter={resetState}
      />
    ) : state.startDate === undefined && state.endDate !== undefined ? (
      <AppliedFilter
        filterText='Before'
        filterValue={formatDate(state.endDate, DateTime.DATE_SHORT)}
        onRemoveFilter={resetState}
      />
    ) : (
      <AppliedFilter
        filterText=''
        filterValue={`${formatDate(
          state.startDate,
          DateTime.DATE_SHORT
        )} → ${formatDate(state.endDate, DateTime.DATE_SHORT)} `}
        onRemoveFilter={resetState}
      />
    ),
  shouldDisplay: (item, state) => {
    const cfDeadline = DateTime.fromISO(item.crowdfundingDeadline);
    let shouldDisplay = true;
    if (state.startDateDate !== undefined) {
      shouldDisplay = shouldDisplay && cfDeadline >= state.startDateDate;
    }

    if (state.projectDeadlineEnd !== undefined) {
      shouldDisplay = shouldDisplay && cfDeadline <= state.endDate;
    }
    return shouldDisplay;
  }
};
