import { useCallback, useContext, useEffect } from 'react';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { getWalletProviderEnv, validateConnection } from '../utils';
import qs from 'qs';
import Cookies from 'js-cookie';
import { AccountContext } from 'contexts/AccountContext';
import { ConnectionValidationStatus } from '../components/AuthenticationModal';

export const useWebWalletConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
) => {
  const { setConnectionValidationStatus } = useContext(AccountContext);

  const validateWebWalletAuth = async (
    authToken: string,
    dispatchSuccessfulLogin: (
      address: string,
      loginMethod: LoginMethodsEnum
    ) => void
  ) => {
    const queryString = window.location.search.slice(1);
    const params = qs.parse(queryString);
    if (params.address === undefined || params.signature === undefined) {
      // not web wallet auth
      return;
    }
    const address = params.address.toString();
    setConnectionValidationStatus(ConnectionValidationStatus.STARTED);
    const isAuthValid = await validateConnection(
      address,
      authToken,
      params.signature.toString()
    );
    if (isAuthValid) {
      dispatchSuccessfulLogin(address, LoginMethodsEnum.wallet);
      setConnectionValidationStatus(ConnectionValidationStatus.SUCCESSFUL);
    } else {
      setConnectionValidationStatus(ConnectionValidationStatus.FAILED);
    }
  };

  const handleWebWalletConnect = useCallback(async () => {
    try {
      const WALLET_PROVIDER_ENV = getWalletProviderEnv();
      const provider = new WalletProvider(WALLET_PROVIDER_ENV);
      const callbackUrl = window.location.href.split('?')[0];
      if (!Cookies.get('webWalletAuthToken')) {
        Cookies.set('webWalletAuthToken', authToken);
      }

      await provider.login({ callbackUrl, token: authToken });
    } catch (error) {
      console.error(error);
    }
  }, [authToken]);

  useEffect(() => {
    const webWalletAuthToken = Cookies.get('webWalletAuthToken');
    if (webWalletAuthToken === undefined) {
      return;
    }
    validateWebWalletAuth(webWalletAuthToken, dispatchSuccessfulLogin)
      .catch(console.error)
      .finally(() => {
        Cookies.remove('webWalletAuthToken');
      });
  }, [authToken]);

  return handleWebWalletConnect;
};
