import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as CancelButton } from './../../assets/icons/refracto/cancel.svg';
import React from 'react';

export const AppliedFilter = ({
  filterText,
  filterValue,
  onRemoveFilter
}: {
  filterText: string;
  filterValue: string;
  onRemoveFilter: () => void;
}) => {
  return (
    <div className='applied-filter'>
      <span className='filter-type'>
        {filterText}
        {filterText.length > 0 && ': '}
        {filterValue}
        <CancelButton
          className='ml-2 mb-1'
          role='button'
          onClick={onRemoveFilter}
        />
      </span>
    </div>
  );
};
