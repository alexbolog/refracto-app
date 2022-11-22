import React from 'react';
import { DateTime } from 'luxon';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({
  startDate,
  endDate,
  onChange
}: {
  startDate?: DateTime;
  endDate?: DateTime;
  onChange?: (startDate: DateTime, endDate: DateTime) => void;
}) => {
  const [firstDate, setFirstDate] = React.useState<Date | null>(null);
  const [secondDate, setSecondDate] = React.useState<Date | null>(null);

  function onDatePick(dates: [Date | null, Date | null]) {
    const startDate = dates[0];
    const endDate = dates[1];
    if (startDate) {
      setFirstDate(startDate);
    }
    if (endDate) {
      setSecondDate(endDate);
    }
    if (onChange && startDate) {
      onChange(
        DateTime.fromJSDate(startDate),
        endDate ? DateTime.fromJSDate(endDate) : DateTime.now()
      );
    }
  }

  return (
    <ReactDatePicker
      // selected={firstDate}
      onChange={onDatePick}
      startDate={firstDate}
      endDate={secondDate}
      selectsRange={true}
      // inline
    />
  );
};

export default DateRangePicker;
