import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const InvestmentProgressBar = ({
  crowdfundingTarget,
  crowdfundingProgress
}: {
  crowdfundingTarget: number;
  crowdfundingProgress: number;
}) => {
  const [remainingCrowdfundingAmount, _] = React.useState(
    crowdfundingTarget * (1 - crowdfundingProgress)
  );
  return (
    <ProgressBar
      data-tip={`${remainingCrowdfundingAmount.toLocaleString()}$ more needed`}
    >
      <ProgressBar
        now={crowdfundingProgress * 100}
        variant='success'
        animated
      />
      <ProgressBar now={(1 - crowdfundingProgress) * 100} variant='danger' />
    </ProgressBar>
  );
};

export default InvestmentProgressBar;
