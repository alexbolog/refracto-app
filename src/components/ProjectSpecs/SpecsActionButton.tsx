import { DateTime } from 'luxon';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { useClaimRefund } from 'sc/transactions/useClaimRefund';
import { Investment } from 'types/accountTypes';

interface ISpecsActionButtonProps {
  projectId: number;
  isExpired: boolean;
  isTargetReached: boolean;
  investments: Investment[];
}

// actions:
// allow
// - invest - !expired && !isTargetReached
// deny
// - nothing - expired && !isInvested
// - withdraw investment (cf failed, redirect to portfolio) - expired && !isTargetReached && isInvested
export const SpecsActionButton = ({
  projectId,
  isExpired,
  isTargetReached,
  investments
}: ISpecsActionButtonProps) => {
  const claimFunds = useClaimRefund();

  if (!isExpired && !isTargetReached) {
    return (
      <Link
        to={`${routeNames.invest.replace(':id', projectId.toString())}`}
        className='btn btn-primary btn-invest'
      >
        Invest
      </Link>
    );
  }

  if (isExpired && !investments.length) {
    return (
      <Link
        to={`${routeNames.invest.replace(':id', projectId.toString())}`}
        className='btn btn-primary btn-invest disabled'
      >
        Invest
      </Link>
    );
  }

  return (
    <button
      className='btn btn-primary btn-invest'
      onClick={() =>
        claimFunds(
          investments[0].nonce,
          investments.reduce((prev, crt) => (prev += crt.balance), 0)
        )
      }
    >
      Withdraw investment
    </button>
  );
};
