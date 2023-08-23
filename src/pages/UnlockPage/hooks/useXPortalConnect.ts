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
import { SessionTypes } from '@multiversx/sdk-wallet-connect-provider';

export const useXPortalConnect = (
  authToken: string,
  dispatchSuccessfulLogin: (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => void,
  handleShowModal: () => void,
  handleHideModal: () => void
): [
  () => Promise<void>,
  string,
  string,
  any[],
  (topic: string) => Promise<void>,
  (topic: string) => Promise<void>
] => {
  const [qrcodeSvg, setQrcodeSvg] = useState<string>('');
  const [deepLink, setDeepLink] = useState<string>('');
  const [existingPairings, setExistingPairings] = useState<any[]>([]);

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
  const getNewProvider = () => {
    const chainId = getChainId();

    return new WalletConnectV2Provider(
      callbacks(),
      chainId,
      relayUrl,
      walletConnectV2ProjectId
    );
  };

  const [provider] = useState<WalletConnectV2Provider>(getNewProvider());

  const handleOpenXPortalConnectModal = async (uri: string) => {
    setQrcodeSvg(await QRCode.toString(uri, { type: 'svg' }));
    handleShowModal();
  };

  const buildDeepLink = (walletConnectUri: string) => {
    return `${walletConnectDeepLink}?wallet-connect=${encodeURIComponent(
      walletConnectUri
    )}`;
  };

  const handleXPortalConnect = useCallback(async () => {
    provider.init();
    const { uri, approval } = await provider.connect();

    setDeepLink(buildDeepLink(uri ?? ''));
    setExistingPairings((await provider.getPairings()) ?? []);

    await handleOpenXPortalConnectModal(uri ?? '');
    await handleLogin(approval);
  }, [
    authToken,
    callbacks,
    dispatchSuccessfulLogin,
    handleOpenXPortalConnectModal
  ]);

  const handleLogin = async (approval: () => Promise<SessionTypes.Struct>) => {
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
  };

  const handleExistingPairLogin = async (topic: string) => {
    const { approval } = await provider.connect({
      topic
    });

    await handleLogin(approval);
  };

  const handleRemoveExistingPairing = async (topic: string) => {
    try {
      if (topic) {
        await provider.logout({
          topic
        });
        setExistingPairings(existingPairings.filter((p) => p.topic !== topic));
      }
    } catch (e) {
      console.warn(
        `Something went wrong trying to remove the existing pairing: ${e}`
      );
    }
  };

  return [
    handleXPortalConnect,
    qrcodeSvg,
    deepLink,
    existingPairings,
    handleExistingPairLogin,
    handleRemoveExistingPairing
  ];
};
