import React from 'react';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Rating = ({ value }: { value: string }) => {
  const riskLevelBox = () => {
    let riskClass = '';
    if (value.includes('Low')) {
      riskClass = 'risk-low';
    } else if (value.includes('Med')) {
      riskClass = 'risk-medium';
    } else if (value.includes('High')) {
      riskClass = 'risk-high';
    } else {
      console.log('Could not find risk class for value: ', value);
    }

    const classes = 'risk-box risk-box-sm risk-high mb-1 ' + riskClass;
    return <span className={classes}>{value}</span>;
  };
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faArrowTrendUp} className='text-primary' />
      <div className='project-specs-type'>Rating</div>
      <div className='project-specs-value'>{riskLevelBox()}</div>
    </div>
  );
};
