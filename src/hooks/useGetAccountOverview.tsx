import { getAccountOverview } from 'apiRequests/backend/accountApi';
import React from 'react';
import { AccountOverview } from 'types/accountTypes';

const useGetAccountOverview = () => {
  const [accountOverview, setAccountOverview] =
    React.useState<AccountOverview>();
  React.useEffect(() => {
    setAccountOverview(getAccountOverview());
  }, []);

  return accountOverview;
};

export default useGetAccountOverview;
