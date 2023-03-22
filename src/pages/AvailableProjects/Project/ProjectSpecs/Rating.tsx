import React from 'react';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiskBox } from 'components/RiskBox';

export const Rating = ({ value }: { value: string }) => {
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faArrowTrendUp} className='text-primary' />
      <div className='project-specs-type'>Rating</div>
      <div className='project-specs-value'>
        <RiskBox riskLevel={value} />
      </div>
    </div>
  );
};
