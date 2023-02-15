import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toLocaleStringOptionsNoDecimals } from 'config';
import React from 'react';

export const Goal = ({ value }: { value: number }) => {
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faFlagCheckered} className='text-primary' />
      <div className='project-specs-type'>Goal</div>
      <div className='project-specs-value'>
        {(value * 100).toLocaleString(
          undefined,
          toLocaleStringOptionsNoDecimals
        )}%
      </div>
    </div>
  );
};
