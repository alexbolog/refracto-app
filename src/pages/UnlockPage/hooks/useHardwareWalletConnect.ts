import { useCallback, useState } from 'react';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { validateConnection } from '../utils';

// Error handling function
const handleError =
  (setErrorMessage: (message: string | undefined) => void) => (e: any) => {
    setErrorMessage(e.message);
  };

export const useHardwareWalletConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
): [
  () => void,
  (chosenAddressIndex: number) => void,
  string[],
  string | undefined,
  () => void
] => {
  const [availableAddresses, setAvailableAddresses] = useState<string[]>([]);
  const [provider] = useState<HWProvider>(new HWProvider());
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const fetchLedgerAddresses = useCallback(async () => {
    try {
      await provider.init();
      const addresses = await provider.getAccounts();
      setAvailableAddresses(addresses);
      setErrorMessage(undefined);
    } catch (e: any) {
      handleError(setErrorMessage)(e);
    }
  }, [authToken]);

  const connectWithLedger = useCallback(
    async (chosenAddressIndex: number) => {
      try {
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
      } catch (e: any) {
        handleError(setErrorMessage)(e);
      }
    },
    [authToken]
  );

  return [
    fetchLedgerAddresses,
    connectWithLedger,
    availableAddresses,
    errorMessage,
    () => {
      setErrorMessage(undefined);
      setAvailableAddresses([]);
    }
  ];
};
