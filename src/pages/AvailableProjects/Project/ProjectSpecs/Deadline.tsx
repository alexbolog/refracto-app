import React from 'react';
import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { formatIso, getIsMobile } from 'utils';

export const Deadline = ({ value }: { value: string }) => {
  const isMobile = getIsMobile();
  return (
    <div className='project-specs'>
      <FontAwesomeIcon
        icon={faHourglassEmpty}
        className={`text-primary ${isMobile ? 'mr-1' : ''}`}
      />
      <div className='project-specs-type'>Deadline</div>
      <div className='project-specs-value'>
        {formatIso(value, DateTime.DATE_SHORT)}
      </div>
    </div>
  );
};
