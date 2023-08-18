import { useCallback } from 'react';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { validateConnection } from '../utils';

export const useExtensionConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
) => {
  return useCallback(async () => {
    const provider = ExtensionProvider.getInstance();
    provider.init();
    const address = await provider.login({
      token: authToken
    });
    const isAuthValid = await validateConnection(
      address,
      authToken,
      provider.account.signature ?? ''
    );
    if (isAuthValid) {
      dispatchSuccessfulLogin(address, LoginMethodsEnum.extension);
    }
  }, [authToken]);
};
