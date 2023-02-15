import { toLocaleStringOptionsNoDecimals } from 'config';
import React, { useState } from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { getDaysUntil } from 'utils';

export const CFProgressBar = ({
  crowdfundedAmount,
  crowdfundingTarget,
  deadline
}: {
  crowdfundedAmount: number;
  crowdfundingTarget: number;
  deadline: string;
}) => {
  const [progressPercentage, setProgressPercentage] = useState(
    (crowdfundedAmount / crowdfundingTarget) * 100
  );

  return (
    <>
      <div className='crowdfunding-progress-wrapper'>
        <span className='crowdfunding-progress-text sum-progress'>
          €
          {crowdfundedAmount.toLocaleString(
            undefined,
            toLocaleStringOptionsNoDecimals
          )}
          /€
          {crowdfundingTarget.toLocaleString(
            undefined,
            toLocaleStringOptionsNoDecimals
          )}
        </span>
        <span className='crowdfunding-progress-text time-left'>
          {Math.floor(getDaysUntil(deadline))} days left
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
    </>
  );
};
