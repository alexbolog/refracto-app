import React from 'react';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { formatIso } from 'utils';

export const Deadline = ({ value }: { value: string }) => {
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faHourglassEmpty} className='text-primary' />
      <div className='project-specs-type'>Deadline</div>
      <div className='project-specs-value'>
        {formatIso(value, DateTime.DATE_SHORT)}
      </div>
    </div>
  );
};
