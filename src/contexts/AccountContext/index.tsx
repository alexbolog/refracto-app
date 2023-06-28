import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React, { useState } from 'react';
import { AccountOverview, InvestmentTransaction } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from './hooks/useGetAccountActiveInvestments';
import { AVAILABLE_CURRENCIES } from 'enums';
import { ProfileInfo } from './types/ProfileInfo';
import useGetProfileInfo from './hooks/useGetAccountInfo';
import useGetInvestmentTransactions from './hooks/useGetInvestmentTransactions';

export interface IAccountContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  activeProjectInvestments?: ActiveProjectInvestment[];
  address?: string;
  availableCashBalance: number;
  selectedCurrency: AVAILABLE_CURRENCIES;
  setSelectedCurrency: (newCurrency: AVAILABLE_CURRENCIES) => void;
  profileInfo: ProfileInfo;
  investmentTransactions: InvestmentTransaction[];
}

const defaultState: IAccountContext = {
  isLoading: true,
  availableCashBalance: 0,
  selectedCurrency: AVAILABLE_CURRENCIES.EUR,
  setSelectedCurrency(_) {
    console.log('default');
  },
  profileInfo: {
    firstName: '',
    lastName: '',
    profilePictureSrc: ''
  },
  investmentTransactions: []
};

export const AccountContext = React.createContext<IAccountContext>(
  defaultState
);

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
  const profileInfo = useGetProfileInfo();
  const investmentTransactions = useGetInvestmentTransactions();

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
        },
        profileInfo,
        investmentTransactions
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
