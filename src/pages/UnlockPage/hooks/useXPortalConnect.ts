import { useCallback, useState } from 'react';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { getChainId, validateConnection } from '../utils';
import QRCode from 'qrcode';
import { relayUrl, walletConnectV2ProjectId } from 'config';

export const useXPortalConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void
): [() => Promise<void>, string, boolean, () => void] => {
  const [qrcodeSvg, setQrcodeSvg] = useState<string>('');
  const [showXPortalConnectModal, setShowXPortalConnectModal] =
    useState<boolean>(false);

  const handleOpenXPortalConnectModal = async (uri: string) => {
    setQrcodeSvg(await QRCode.toString(uri, { type: 'svg' }));
    setShowXPortalConnectModal(true);
  };

  const handleXPortalConnect = useCallback(async () => {
    async () => {
      const chainId = getChainId();

      const callbacks = {
        onClientLogin: async function () {
          setShowXPortalConnectModal(false);
          // const address = await provider.getAddress();
          // console.log('Address:', address);
        },
        onClientLogout: async function () {
          console.log('onClientLogout()');
        },
        onClientEvent: async function (event: any) {
          console.log('onClientEvent()', event);
        }
      };

      const provider = new WalletConnectV2Provider(
        callbacks,
        chainId,
        relayUrl,
        walletConnectV2ProjectId
      );

      provider.init();
      const { uri, approval } = await provider.connect();
      await handleOpenXPortalConnectModal(uri ?? '');
      await provider.login({ approval, token: authToken });

      console.log(provider.address);
      console.log(provider.signature);

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
    };
  }, [authToken]);

  const hideXPortalConnectModal = () => {
    setShowXPortalConnectModal(false);
  };

  return [
    handleXPortalConnect,
    qrcodeSvg,
    showXPortalConnectModal,
    hideXPortalConnectModal
  ];
};
