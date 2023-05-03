import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React, { useState } from 'react';
import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from './hooks/useGetAccountActiveInvestments';
import { AVAILABLE_CURRENCIES } from 'enums';

export interface IAccountContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  activeProjectInvestments?: ActiveProjectInvestment[];
  address?: string;
  availableCashBalance: number;
  selectedCurrency: AVAILABLE_CURRENCIES;
  setSelectedCurrency: (newCurrency: AVAILABLE_CURRENCIES) => void;
}

const defaultState: IAccountContext = {
  isLoading: true,
  availableCashBalance: 0,
  selectedCurrency: AVAILABLE_CURRENCIES.EUR,
  setSelectedCurrency(_) {
    console.log('default');
  }
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
  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCIES.EUR
  );

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
        availableCashBalance,
        selectedCurrency,
        setSelectedCurrency(newCurrency) {
          setSelectedCurrency(newCurrency);
        }
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
