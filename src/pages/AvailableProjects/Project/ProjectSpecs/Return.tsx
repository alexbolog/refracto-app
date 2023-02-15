import React from 'react';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toLocaleStringOptionsNoDecimals } from 'config';

export const Return = ({ value }: { value: number }) => {
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faDollarSign} className='text-primary' />
      <div className='project-specs-type'>Return</div>
      <div className='project-specs-value'>
        {(value * 100).toLocaleString(
          undefined,
          toLocaleStringOptionsNoDecimals
        )}
        %
      </div>
    </div>
  );
};
