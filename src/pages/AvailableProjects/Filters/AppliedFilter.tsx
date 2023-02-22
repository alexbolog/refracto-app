import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as CancelButton } from './../../../assets/icons/refracto/cancel.svg';
import React from 'react';

export const AppliedFilter = ({
  filterText,
  filterValue
}: {
  filterText: string;
  filterValue: string;
}) => {
  return (
    <div className='applied-filter'>
      <span className='filter-type'>
        {filterText}: {filterValue}
        <CancelButton className='ml-2 mb-1' role='button' />
      </span>
    </div>
  );
};
