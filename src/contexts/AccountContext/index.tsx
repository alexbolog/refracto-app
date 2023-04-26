import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React, { useState } from 'react';
import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from './hooks/useGetAccountActiveInvestments';

export interface IAccountContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  activeProjectInvestments?: ActiveProjectInvestment[];
  address?: string;
  availableCashBalance: number;
}

const defaultState: IAccountContext = {
  isLoading: true,
  availableCashBalance: 0
};

export const AccountContext =
  React.createContext<IAccountContext>(defaultState);

export const AccountContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    account: { address }
  } = useGetAccountInfo();
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableCashBalance, setAvailableCashBalance] = useState(123456.789);

  const accountOverview = useGetAccountOverview();
  const activeProjectInvestments = useGetAccountActiveInvestments();

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  return (
    <AccountContext.Provider
      value={{
        isLoading,
        accountOverview,
        activeProjectInvestments,
        address,
        availableCashBalance
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
