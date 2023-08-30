import { useCallback, useContext } from 'react';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { validateConnection } from '../utils';
import { AccountContext } from 'contexts/AccountContext';
import { ConnectionValidationStatus } from '../components/AuthenticationModal';

export const useExtensionConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
) => {
  const { setConnectionValidationStatus } = useContext(AccountContext);

  return useCallback(async () => {
    const provider = ExtensionProvider.getInstance();
    provider.init();
    const address = await provider.login({
      token: authToken
    });
    setConnectionValidationStatus(ConnectionValidationStatus.STARTED);

    try {
      const isAuthValid = await validateConnection(
        address,
        authToken,
        provider.account.signature ?? ''
      );
      if (isAuthValid) {
        setConnectionValidationStatus(ConnectionValidationStatus.SUCCESSFUL);
        dispatchSuccessfulLogin(address, LoginMethodsEnum.extension);
      } else {
        setConnectionValidationStatus(ConnectionValidationStatus.FAILED);
      }
    } catch (e) {
      console.log(e);
      setConnectionValidationStatus(ConnectionValidationStatus.FAILED);
    }
  }, [authToken]);
};
