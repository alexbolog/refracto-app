import React from 'react';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toLocaleStringOptionsNoDecimals } from 'config';
import { getIsMobile } from 'utils';

export const Return = ({ value }: { value: number }) => {
  const isMobile = getIsMobile();
  return (
    <div className='project-specs'>
      <FontAwesomeIcon
        icon={faDollarSign}
        className={`text-primary ${isMobile ? 'mr-2' : ''}`}
      />
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
