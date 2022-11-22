import React, { ReactNode } from 'react';
import { DateTime } from 'luxon';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({
  defaultStartDate = DateTime.now().minus({ years: 1 }),
  defaultEndDate = DateTime.now(),
  onChange
}: {
  defaultStartDate?: DateTime;
  defaultEndDate?: DateTime;
  startDate?: DateTime;
  endDate?: DateTime;
  onChange?: (startDate: DateTime, endDate: DateTime) => void;
}) => {
  const [firstDate, setFirstDate] = React.useState<Date | null>(null);
  const [secondDate, setSecondDate] = React.useState<Date | null>(null);

  const renderHeader = (params: any): ReactNode => {
    debugger;
    return <></>;
  };

  const renderInput = (): ReactNode => {
    const intervalStart = firstDate
      ? DateTime.fromJSDate(firstDate)
      : defaultStartDate;
    const intervalEnd = secondDate
      ? DateTime.fromJSDate(secondDate)
      : defaultEndDate;
    return (
      <p>
        {intervalStart.toLocaleString(DateTime.DATE_MED) +
          '->' +
          intervalEnd.toLocaleString(DateTime.DATE_MED)}
      </p>
    );
  };

  const onDatePick = (dates: [Date | null, Date | null]) => {
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
  };

  return (
    <ReactDatePicker
      // selected={firstDate}
      // renderCustomHeader={renderHeader}
      customInput={renderInput()}
      dateFormat={'dd MMM yyyy'}
      onChange={onDatePick}
      startDate={firstDate}
      endDate={secondDate}
      selectsRange={true}
    />
  );
};

export default DateRangePicker;
