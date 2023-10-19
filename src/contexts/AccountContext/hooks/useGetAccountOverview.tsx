import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { getAccountOverview as getAccountOverviewApiCall } from 'apiRequests/backend/accountApi';
import {
  getAccountEsdtBalance,
  getAccountSharesBalance
} from 'apiRequests/multiversx';
import { USDC_TOKEN_ID } from 'config';
import { readFavoriteProjects } from 'db/favoriteProjects';
import React, { useContext, useEffect } from 'react';
import {
  AccountOverview,
  FavoriteProject,
  Investment
} from 'types/accountTypes';
import BigNumber from 'bignumber.js';
import { ProjectContext } from 'contexts/ProjectContext';
import { denominatedAmountToAmount } from 'helpers/utils';

const useGetAccountOverview = () => {
  const [accountOverview, setAccountOverview] =
    React.useState<AccountOverview>();
  const { address } = useGetAccountInfo();
  useEffect(() => {
    getAccountOverview().then((data) => setAccountOverview(data));
  }, [address]);

  const projectContext = useContext(ProjectContext);

  useEffect(() => {
    refreshAccountOverview();
  }, [projectContext.availableProjects]);

  const getAccountOverview = async (): Promise<AccountOverview> => {
    // const accountOverview = await getAccountOverviewApiCall(address);
    // const favoriteProjects = await readFavoriteProjects(address);
    // console.log('loaded favorite projects', favoriteProjects);
    // //TODO: add favorite projects to accountOverview
    // // accountOverview.favoriteProjects = favoriteProjects;
    // return accountOverview;

    const cashBalance = denominatedAmountToAmount(
      await getAccountEsdtBalance(address, USDC_TOKEN_ID),
      6
    );
    const accountShares = await getAccountSharesBalance(address);
    const investments = await getInvestments(accountShares);

    const committedfunds = investments.reduce(
      (crt, prev) => (crt += prev.balance),
      0
    );

    const favoriteProjects = await readFavoriteProjects(address);
    return {
      availableBalance: cashBalance,
      accountValue: 0, //TODO
      committedfunds,
      // activeInvestments?: ActiveInvestmentsStatistics; //TODO
      favoriteProjects, //favoriteProjects,
      suggestedProjects: [],
      payments: [],
      investments
    };
  };

  const refreshAccountOverview = async () => {
    const accountOverview = await getAccountOverview();
    setAccountOverview(accountOverview);
  };

  const getInvestments = async (sharesBalance: any[]) => {
    console.log('All available project', projectContext.availableProjects);
    const investments: Investment[] = [];
    for (let i = 0; i < sharesBalance.length; i++) {
      console.log('Share investment', sharesBalance[i]);
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

  return { accountOverview, refreshAccountOverview };
};

export default useGetAccountOverview;
