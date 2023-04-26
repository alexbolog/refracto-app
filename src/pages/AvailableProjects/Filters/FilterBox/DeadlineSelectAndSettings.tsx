import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SettingsButton } from './SettingsButton';
import DateRangePicker from 'components/DateRangePicker';
import { DateTime } from 'luxon';

export const DeadlineSelectAndSettings = ({
  onChange
}: {
  onChange: (start: DateTime, end: DateTime) => void;
}) => {
  const onDatePick = (startDate: DateTime, endDate: DateTime) => {
    onChange(startDate, endDate);
  };
  return (
    <div>
      <DateRangePicker
        onChange={onDatePick}
        customInput='Select Deadline'
        customBtnClassName='btn btn-primary dropdown-toggle dropdown deadline-select'
      ></DateRangePicker>
      <SettingsButton />
    </div>
  );
};
