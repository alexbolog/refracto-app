import {
  useGetAccountInfo,
  useGetAccountProvider,
  useGetIsLoggedIn,
  useGetLoginInfo
} from '@multiversx/sdk-dapp/hooks';
import useGetAccountOverview from './hooks/useGetAccountOverview';
import React, { useEffect, useState } from 'react';
import { AccountOverview } from 'types/accountTypes';
import { ActiveProjectInvestment } from 'types/projectTypes';
import useGetAccountActiveInvestments from './hooks/useGetAccountActiveInvestments';
import { AVAILABLE_CURRENCIES } from 'enums';
import { ProfileInfo } from './types/ProfileInfo';
import useGetProfileInfo from './hooks/useGetAccountInfo';
import { getNewAuthToken } from 'apiRequests/backend/accountApi';
import { ConnectionValidationStatus } from 'pages/UnlockPage/components/AuthenticationModal';

export interface IAccountContext {
  isLoading: boolean;
  accountOverview?: AccountOverview;
  activeProjectInvestments?: ActiveProjectInvestment[];
  address?: string;
  availableCashBalance: number;
  selectedCurrency: AVAILABLE_CURRENCIES;
  setSelectedCurrency: (newCurrency: AVAILABLE_CURRENCIES) => void;
  profileInfo: ProfileInfo;
  authToken: string;
  connectionValidationStatus: ConnectionValidationStatus;
  setConnectionValidationStatus: (
    newStatus: ConnectionValidationStatus
  ) => void;
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
  authToken: '',
  connectionValidationStatus: ConnectionValidationStatus.NOT_STARTED,
  setConnectionValidationStatus: (_) => {
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
  const [availableCashBalance, setAvailableCashBalance] = useState(123456.789);
  const [selectedCurrency, setSelectedCurrency] = useState(
    AVAILABLE_CURRENCIES.EUR
  );
  const [authToken, setAuthToken] = useState('');
  const [connectionValidationStatus, setConnectionValidationStatus] = useState(
    ConnectionValidationStatus.NOT_STARTED
  );

  const accountOverview = useGetAccountOverview();
  const activeProjectInvestments = useGetAccountActiveInvestments();
  const profileInfo = useGetProfileInfo();

  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    getNewAuthToken().then((newToken) => {
      setAuthToken(newToken);
    });
  }, [address, isLoggedIn]);

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
        authToken,
        connectionValidationStatus,
        setConnectionValidationStatus
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
