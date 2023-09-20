import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { getAccountOverview as getAccountOverviewApiCall } from 'apiRequests/backend/accountApi';
import { readFavoriteProjects } from 'db/favoriteProjects';
import React, { useEffect } from 'react';
import { AccountOverview, FavoriteProject } from 'types/accountTypes';

const useGetAccountOverview = () => {
  const [accountOverview, setAccountOverview] =
    React.useState<AccountOverview>();
  const { address } = useGetAccountInfo();
  useEffect(() => {
    getAccountOverview().then((data) => setAccountOverview(data));
  }, [address]);

  const getAccountOverview = async () => {
    const accountOverview = getAccountOverviewApiCall();
    const favoriteProjects = await readFavoriteProjects(address);
    console.log('loaded favorite projects', favoriteProjects);
    accountOverview.favoriteProjects = favoriteProjects;
    return accountOverview;
  };

  const refreshAccountOverview = async () => {
    const accountOverview = await getAccountOverview();
    setAccountOverview(accountOverview);
  };

  return { accountOverview, refreshAccountOverview };
};

export default useGetAccountOverview;
