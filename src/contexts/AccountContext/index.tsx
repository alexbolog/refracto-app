import {
  useGetAccountInfo,
  useGetIsLoggedIn,
  useGetPendingTransactions
} from '@multiversx/sdk-dapp/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React, { useEffect, useState } from 'react';
import { AccountOverview, InvestmentTransaction } from 'types/accountTypes';
import { AVAILABLE_CURRENCIES } from 'enums';
import { ProfileInfo } from './types/ProfileInfo';
import useGetProfileInfo from './hooks/useGetAccountInfo';
import useGetInvestmentTransactions from './hooks/useGetInvestmentTransactions';
import { getNewAuthToken } from 'apiRequests/backend/accountApi';
import { ConnectionValidationStatus } from 'pages/UnlockPage/components/AuthenticationModal';
import { getAccountEsdtBalance } from 'apiRequests/multiversx';
import { USDC_TOKEN_ID } from 'config';
import { USDC_DECIMALS_AMOUNT, denominatedAmountToAmount } from 'utils';

export interface IAccountContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  address?: string;
  availableCashBalance: number;
  selectedCurrency: AVAILABLE_CURRENCIES;
  setSelectedCurrency: (newCurrency: AVAILABLE_CURRENCIES) => void;
  profileInfo: ProfileInfo;
  investmentTransactions: InvestmentTransaction[];
  authToken: string;
  connectionValidationStatus: ConnectionValidationStatus;
  setConnectionValidationStatus: (
    newStatus: ConnectionValidationStatus
  ) => void;
  refreshAccountOverview: () => Promise<void>;
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
  investmentTransactions: [],
  authToken: '',
  connectionValidationStatus: ConnectionValidationStatus.NOT_STARTED,
  setConnectionValidationStatus: (_) => {
    console.log('default');
  },
  refreshAccountOverview: async () => {
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
    account: { address, assets }
  } = useGetAccountInfo();
  const isLoggedIn = useGetIsLoggedIn();
  const [isLoading, setIsLoading] = React.useState(true);
  const [availableCashBalance, setAvailableCashBalance] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCIES.EUR
  );
  const [authToken, setAuthToken] = useState('');
  const [connectionValidationStatus, setConnectionValidationStatus] = useState(
    ConnectionValidationStatus.NOT_STARTED
  );

  const { accountOverview, refreshAccountOverview } = useGetAccountOverview();
  const profileInfo = useGetProfileInfo();
  const investmentTransactions = useGetInvestmentTransactions();
  const { hasPendingTransactions } = useGetPendingTransactions();

  useEffect(() => {
    setIsLoading(false);
  }, [address, hasPendingTransactions]);

  useEffect(() => {
    getAccountEsdtBalance(address, USDC_TOKEN_ID).then((balance) => {
      setAvailableCashBalance(
        denominatedAmountToAmount(balance, USDC_DECIMALS_AMOUNT)
      );
    });
  }, [address, hasPendingTransactions]);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    getNewAuthToken().then((newToken) => {
      setAuthToken(newToken ?? '');
    });
  }, [address, isLoggedIn]);

  // useEffect(() => {
  //   getInvestmentTransactions().then((data) => {
  //     setInvestmentTransactions(data);
  //   });
  // }, [address, isLoggedIn]);

  return (
    <AccountContext.Provider
      value={{
        isLoading,
        accountOverview,
        address,
        availableCashBalance,
        selectedCurrency,
        setSelectedCurrency(newCurrency) {
          setSelectedCurrency(newCurrency);
        },
        profileInfo,
        investmentTransactions,
        authToken,
        connectionValidationStatus,
        setConnectionValidationStatus,
        refreshAccountOverview
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
