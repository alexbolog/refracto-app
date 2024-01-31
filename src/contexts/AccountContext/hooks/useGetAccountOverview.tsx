import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import {
  getAccountEsdtBalance,
  getAccountSharesBalance
} from 'apiRequests/multiversx';
import { USDC_TOKEN_ID } from 'config';
import { readFavoriteProjects } from 'db/favoriteProjects';
import React, { useContext, useEffect } from 'react';
import {
  AccountOverview,
  ActiveInvestmentsStatistics,
  FavoriteProject,
  Investment
} from 'types/accountTypes';
import BigNumber from 'bignumber.js';
import { ProjectContext } from 'contexts/ProjectContext';
import {
  denominatedAmountToAmount,
  getAccruedInterest,
  getExpectedReturnAmount
} from 'utils';
import useGetProjects from 'contexts/ProjectContext/hooks/useGetProjects';

const useGetAccountOverview = () => {
  const [accountOverview, setAccountOverview] =
    React.useState<AccountOverview>();
  const { allProjects } = useGetProjects();

  const { address } = useGetAccountInfo();
  useEffect(() => {
    getAccountOverview().then((data) => setAccountOverview(data));
  }, [address]);

  const projectContext = useContext(ProjectContext);

  useEffect(() => {
    refreshAccountOverview();
  }, [allProjects]);

  const getAccountOverview = async (): Promise<AccountOverview> => {
    const cashBalance = denominatedAmountToAmount(
      await getAccountEsdtBalance(address, USDC_TOKEN_ID),
      6
    );
    const accountShares = await getAccountSharesBalance(address);
    const investments = await getAccountSharesData(accountShares);

    const activeInvestmentsStatistics = getActiveInvestments(investments);

    const favoriteProjects = await readFavoriteProjects(address);
    return {
      availableBalance: cashBalance,
      accountValue: activeInvestmentsStatistics.expectedTotalReturn,
      committedfunds: activeInvestmentsStatistics.totalInvested,
      activeInvestments: activeInvestmentsStatistics,
      favoriteProjects,
      suggestedProjects: [],
      payments: [],
      investments
    };
  };

  const refreshAccountOverview = async () => {
    const accountOverview = await getAccountOverview();
    setAccountOverview(accountOverview);
  };

  const getAccountSharesData = async (sharesBalance: any[]) => {
    const investments: Investment[] = [];
    for (let i = 0; i < sharesBalance.length; i++) {
      const shareBalance = sharesBalance[i];
      const project = projectContext.getProjectByLoanShareNonce(
        shareBalance.nonce
      );
      if (project === undefined) {
        continue;
      }
      investments.push({
        nonce: shareBalance.nonce,
        balance: denominatedAmountToAmount(shareBalance.balance),
        projectInfo: project
      });
    }
    return investments;
  };

  const getActiveInvestments = (
    investments: Investment[]
  ): ActiveInvestmentsStatistics => {
    const totalInvested = investments.reduce(
      (prev, crt) => (prev += crt.balance),
      0
    );
    const returnedToDate = 0;
    const lifetimeReturn = 0;

    const expectedTotalProfit = investments.reduce(
      (prev, crt) =>
        (prev += getExpectedReturnAmount(
          crt.balance,
          crt.projectInfo.returnPercentage
        )),
      0
    );

    const expectedTotalReturn = totalInvested + expectedTotalProfit;
    const averageExpectedReturn =
      investments.reduce(
        (prev, crt) => (prev += crt.projectInfo.returnPercentage),
        0
      ) / investments.length;

    return {
      totalInvested,
      returnedToDate,
      lifetimeReturn,
      expectedTotalReturn,
      expectedTotalProfit,
      averageExpectedReturn
    };
  };

  return { accountOverview, refreshAccountOverview };
};

export default useGetAccountOverview;
