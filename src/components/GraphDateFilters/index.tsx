import { DateTime } from 'luxon';
import DateRangePicker from '../DateRangePicker';
import * as React from 'react';

const GraphDateFilters = ({
  onReset,
  onDatePick
}: {
  onReset: () => void;
  onDatePick: (startDate: DateTime, endDate?: DateTime) => void;
}) => {
  const now = DateTime.now();

  const handleOneYearFilter = () => {
    onDatePick(now.minus({ years: 1 }));
  };
  const handleOneQuarterFilter = () => {
    onDatePick(now.minus({ quarters: 1 }));
  };
  const handleOneMonthFilter = () => {
    onDatePick(now.minus({ months: 1 }));
  };

  return (
    <div>
      <button className='btn btn-outline-primary mr-2 active' onClick={onReset}>
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
      <DateRangePicker onChange={onDatePick}></DateRangePicker>
    </div>
  );
};

export default GraphDateFilters;
