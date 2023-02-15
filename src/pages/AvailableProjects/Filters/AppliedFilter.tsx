import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <FontAwesomeIcon icon={faCircleXmark} className='ml-2' />
      </span>
    </div>
  );
};
