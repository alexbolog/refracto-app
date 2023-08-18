import React, { useContext, useEffect, useState } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { routeNames } from 'routes';
import ReactGA from 'react-ga4';
import { AccountContext } from 'contexts/AccountContext';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import {
  WalletProvider,
  WALLET_PROVIDER_DEVNET,
  WALLET_PROVIDER_MAINNET,
  WALLET_PROVIDER_TESTNET
} from '@multiversx/sdk-web-wallet-provider';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { useDispatch } from '@multiversx/sdk-dapp/reduxStore/DappProviderContext';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { EnvironmentsEnum, LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { getSupabaseAuthHeaders } from 'apiRequests/backend/accountApi';
import { environment, relayUrl, walletConnectV2ProjectId } from 'config';
import qs from 'qs';
import QRCode from 'qrcode';
import { Modal } from 'react-bootstrap';

export const UnlockRoute: () => JSX.Element = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { authToken } = useContext(AccountContext);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    } else {
      console.log('User went to login page');
      ReactGA.event({
        category: 'engagement',
        action: 'login_1',
        label: 'User went to login page'
      });
    }
  }, [isLoggedIn]);

  /* EXTENSION CONNECT */
  const handleExtensionConnect = async () => {
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
      dispatch(
        loginAction({ address, loginMethod: LoginMethodsEnum.extension })
      );
    }
  };

  /* WEB WALLET CONNECT */
  const handleWebWalletConnect = async () => {
    const WALLET_PROVIDER_ENV =
      environment === EnvironmentsEnum.mainnet
        ? WALLET_PROVIDER_MAINNET
        : environment === EnvironmentsEnum.devnet
        ? WALLET_PROVIDER_DEVNET
        : WALLET_PROVIDER_TESTNET;
    const provider = new WalletProvider(WALLET_PROVIDER_ENV);
    const callbackUrl = window.location.href.split('?')[0];
    await provider.login({ callbackUrl, token: authToken });
  };

  useEffect(() => {
    const queryString = window.location.search.slice(1);
    const params = qs.parse(queryString);
    if (params.address === undefined || params.signature === undefined) {
      // not web wallet auth
      return;
    }
    const address = params.address.toString();
    validateConnection(address, authToken, params.signature.toString()).then(
      (isAuthValid) => {
        if (isAuthValid) {
          dispatch(
            loginAction({
              address,
              loginMethod: LoginMethodsEnum.wallet
            })
          );
        }
      }
    );
  }, []);

  /* LEDGER CONNECT */
  const handleHardwareWalletConnect = async () => {
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
      dispatch(loginAction({ address, loginMethod: LoginMethodsEnum.ledger }));
    }
  };

  /* XPORTAL CONNECT */
  const [qrcodeSvg, setQrcodeSvg] = useState('');
  const [showXPortalConnectModal, setShowXPortalConnectModal] = useState(false);

  const handleXPortalConnect = async () => {
    const chainId =
      environment === 'mainnet' ? '1' : environment === 'devnet' ? 'D' : 'T';

    const callbacks = {
      onClientLogin: async function () {
        // closeModal() is defined above
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
      dispatch(
        loginAction({
          address: provider.address,
          loginMethod: LoginMethodsEnum.walletconnectv2
        })
      );
    }
  };

  const handleOpenXPortalConnectModal = async (uri: string) => {
    setQrcodeSvg(await QRCode.toString(uri, { type: 'svg' }));
    setShowXPortalConnectModal(true);
  };

  const validateConnection = async (
    address: string,
    token: string,
    signature: string
  ) => {
    return await getSupabaseAuthHeaders(address, token, signature);
  };

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>
            <button
              className='btn btn-primary'
              onClick={handleExtensionConnect}
            >
              Extension test
            </button>
            <button
              className='btn btn-primary'
              onClick={handleWebWalletConnect}
            >
              Web wallet test
            </button>
            <button
              className='btn btn-primary'
              onClick={handleHardwareWalletConnect}
            >
              Ledger wallet test
            </button>
            <button className='btn btn-primary' onClick={handleXPortalConnect}>
              Wallet connect test
            </button>
            <Modal show={showXPortalConnectModal} centered size='xl'>
              <Modal.Header>XPortal Connect</Modal.Header>
              <Modal.Body>
                <div>
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      qrcodeSvg
                    )}`}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className='btn btn-danger'
                  onClick={() => setShowXPortalConnectModal(false)}
                >
                  Dismiss
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
