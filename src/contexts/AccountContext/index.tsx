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
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';

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
  authToken: ''
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

  const accountOverview = useGetAccountOverview();
  const activeProjectInvestments = useGetAccountActiveInvestments();
  const profileInfo = useGetProfileInfo();
  // useEffect(() => {
  //   switch (provider.providerType) {
  //     case 'extension':
  //       console.log(
  //         'cast attempt',
  //         (provider.provider as ExtensionProvider).account.signature
  //       );
  //       const instance = ExtensionProvider.getInstance();
  //       if (!instance.isInitialized()) {
  //         instance.init();
  //       }
  //       console.log('provider signature extension', instance.account.signature);
  //       break;
  //     case 'ledger':
  //     case 'walletconnect':
  //     case 'walletconnectv2':
  //     case 'wallet':
  //     case 'opera':
  //     case 'extra':
  //       break;
  //   }
  // }, [address]);
  React.useEffect(() => {
    setIsLoading(false);
  }, [address]);

  useEffect(() => {
    if (isLoggedIn) {
      return;
    }
    getNewAuthToken().then((newToken) => setAuthToken(newToken));
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
        authToken
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
