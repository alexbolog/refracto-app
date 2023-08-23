import { useCallback, useState } from 'react';
import {
  WalletConnectV2Provider,
  PairingTypes
} from '@multiversx/sdk-wallet-connect-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { getChainId, validateConnection } from '../utils';
import QRCode from 'qrcode';
import {
  relayUrl,
  walletConnectV2ProjectId,
  walletConnectDeepLink
} from 'config';

export const useXPortalConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void,
  handleShowModal: () => void,
  handleHideModal: () => void
): [() => Promise<void>, string] => {
  const [qrcodeSvg, setQrcodeSvg] = useState<string>('');

  const handleOpenXPortalConnectModal = async (uri: string) => {
    setQrcodeSvg(await QRCode.toString(uri, { type: 'svg' }));
    handleShowModal();
  };

  const callbacks = useCallback(
    () => ({
      onClientLogin: async function () {
        handleHideModal();
      },
      onClientLogout: async function () {
        console.log('onClientLogout()');
      },
      onClientEvent: async function (event: any) {
        console.log('onClientEvent()', event);
      }
    }),
    [handleHideModal]
  );

  const handleXPortalConnect = useCallback(async () => {
    const chainId = getChainId();
    const provider = new WalletConnectV2Provider(
      callbacks(),
      chainId,
      relayUrl,
      walletConnectV2ProjectId
    );

    provider.init();
    const { uri, approval } = await provider.connect();
    await handleOpenXPortalConnectModal(uri ?? '');

    await provider.login({ approval, token: authToken });

    const isAuthValid = await validateConnection(
      provider.address,
      authToken,
      provider.signature
    );

    if (isAuthValid) {
      dispatchSuccessfulLogin(
        provider.address,
        LoginMethodsEnum.walletconnectv2
      );
    }
  }, [
    authToken,
    callbacks,
    dispatchSuccessfulLogin,
    handleOpenXPortalConnectModal
  ]);

  return [handleXPortalConnect, qrcodeSvg];
};
