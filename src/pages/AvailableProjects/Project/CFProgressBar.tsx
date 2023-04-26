import React from 'react';
import { toLocaleStringOptionsNoDecimals } from 'config';
import { formatRelativeDate, fromIso } from 'utils';

export const CFProgressBar = ({
  className,
  crowdfundedAmount,
  crowdfundingTarget,
  deadline
}: {
  className?: string;
  crowdfundedAmount: number;
  crowdfundingTarget: number;
  deadline: string;
}) => {
  const progressPercentage = (crowdfundedAmount / crowdfundingTarget) * 100;

  return (
    <div className={className}>
      <div className='crowdfunding-progress-wrapper'>
        <span className='crowdfunding-progress-text sum-progress'>
          €
          {crowdfundedAmount.toLocaleString(
            undefined,
            toLocaleStringOptionsNoDecimals
          )}{' '}
          / €
          {crowdfundingTarget.toLocaleString(
            undefined,
            toLocaleStringOptionsNoDecimals
          )}
        </span>
        <span className='crowdfunding-progress-text time-left'>
          {formatRelativeDate(fromIso(deadline))}
        </span>
      </div>
      <div className='progress w-100'>
        <div
          className='progress-bar progress-animated'
          style={{
            width: `${progressPercentage}%`
          }}
        ></div>
      </div>
    </div>
  );
};
