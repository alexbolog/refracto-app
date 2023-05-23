import { DateTime } from 'luxon';
import DateRangePicker from '../DateRangePicker';
import * as React from 'react';

const GraphDateFilters = (props: {
  onReset: () => void;
  onDatePick: (startDate: DateTime, endDate?: DateTime) => void;
}) => {
  const now = DateTime.now();

  const handleOneYearFilter = () => {
    props.onDatePick(now.minus({ years: 1 }));
  };
  const handleOneQuarterFilter = () => {
    props.onDatePick(now.minus({ quarters: 1 }));
  };
  const handleOneMonthFilter = () => {
    props.onDatePick(now.minus({ months: 1 }));
  };

  return (
    <div>
      <button
        className='btn btn-outline-primary mr-2 active'
        onClick={props.onReset}
      >
        Reset
      </button>
      <button
        className='btn btn-outline-primary mr-2'
        onClick={handleOneYearFilter}
      >
        Last Year
      </button>
      <button
        className='btn btn-outline-primary mr-2'
        onClick={handleOneQuarterFilter}
      >
        Last Quarter
      </button>
      <button
        className='btn btn-outline-primary mr-2'
        onClick={handleOneMonthFilter}
      >
        Last Month
      </button>
      <DateRangePicker onChange={props.onDatePick}></DateRangePicker>
    </div>
  );
};

export default GraphDateFilters;
