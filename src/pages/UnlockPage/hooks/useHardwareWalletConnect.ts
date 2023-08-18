import { useCallback } from 'react';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { validateConnection } from '../utils';

export const useHardwareWalletConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
) => {
  return useCallback(async () => {
    const provider = new HWProvider();
    provider.init();

    const addresses = await provider.getAccounts();
    //TODO: display them in a modal
    console.log('Ledger addresses', addresses);

    //TODO: let the user select the address index based on addresses field above
    const chosenAddressIndex = 3;
    const { address, signature } = await provider.tokenLogin({
      addressIndex: chosenAddressIndex,
      token: Buffer.from(`${authToken}{}`)
    });
    const isAuthValid = await validateConnection(
      address,
      authToken,
      signature.hex()
    );

    if (isAuthValid) {
      dispatchSuccessfulLogin(address, LoginMethodsEnum.ledger);
    }
  }, [authToken]);
};
