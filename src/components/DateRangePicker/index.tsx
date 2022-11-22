import React, { ReactNode } from 'react';
import { DateTime } from 'luxon';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';

import './style.css';

const DateRangePicker = ({
  onChange,
  defaultStartDate = DateTime.now().minus({ years: 1 }),
  defaultEndDate = DateTime.now()
}: {
  startDate?: DateTime;
  endDate?: DateTime;
  onChange?: (startDate: DateTime, endDate: DateTime) => void;
  defaultStartDate?: DateTime;
  defaultEndDate?: DateTime;
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
      <span className='btn btn-outline-primary'>
        {intervalStart.toLocaleString(DateTime.DATE_MED)}
        <FontAwesomeIcon icon={faArrowRight} className='ml-2 mr-2' />
        {intervalEnd.toLocaleString(DateTime.DATE_MED)}
        <FontAwesomeIcon icon={faCalendar} className='ml-2' />
      </span>
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
