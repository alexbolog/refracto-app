import React from 'react';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Rating = ({ value }: { value: string }) => {
  const riskLevelBox = () => {
    const isLowRisk = value.includes('Low');
    const isMedRisk = value.includes('Med');
    if (isLowRisk) {
      return (
        <span className='risk-box risk-box-sm risk-low mb-1'>{value}</span>
      );
    }
    if (isMedRisk) {
      return (
        <span className='risk-box risk-box-sm risk-medium mb-1'>{value}</span>
      );
    }

    return <span className='risk-box risk-box-sm risk-high mb-1'>{value}</span>;
  };
  return (
    <div className='project-specs'>
      <FontAwesomeIcon icon={faArrowTrendUp} className='text-primary' />
      <div className='project-specs-type'>Rating</div>
      <div className='project-specs-value'>{riskLevelBox()}</div>
    </div>
  );
};
