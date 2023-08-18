import React, { useContext, useEffect, useState } from 'react';
import {
  useExtensionLogin,
  useGetAccountProvider,
  useGetIsLoggedIn,
  useGetLoginInfo
} from '@multiversx/sdk-dapp/hooks';
import { routeNames } from 'routes';
import ReactGA from 'react-ga4';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton
} from '@multiversx/sdk-dapp/UI';
import { AccountContext } from 'contexts/AccountContext';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider';
import {
  WalletProvider,
  WALLET_PROVIDER_DEVNET,
  WALLET_PROVIDER_MAINNET,
  WALLET_PROVIDER_TESTNET
} from '@multiversx/sdk-web-wallet-provider';
import { HWProvider } from '@multiversx/sdk-hw-provider';
import { useDispatch } from '@multiversx/sdk-dapp/reduxStore/DappProviderContext';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { EnvironmentsEnum, LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { getSupabaseAuthHeaders } from 'apiRequests/backend/accountApi';
import { environment } from 'config';
import qs from 'qs';
import QRCode from 'qrcode';

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
            <ExtensionLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Extension'}
              token={authToken}
              nativeAuth={true}
            />
            <button
              className='btn btn-primary'
              onClick={handleExtensionConnect}
            >
              Extension test
            </button>
            <WebWalletLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Web wallet'}
              token={authToken}
              nativeAuth={true}
            />
            <button
              className='btn btn-primary'
              onClick={handleWebWalletConnect}
            >
              Web wallet test
            </button>
            <LedgerLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Ledger'}
              token={authToken}
              nativeAuth={true}
            />
            <button
              className='btn btn-primary'
              onClick={handleHardwareWalletConnect}
            >
              Ledger wallet test
            </button>
            <WalletConnectLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'xPortal'}
              isWalletConnectV2={true}
              token={authToken}
              nativeAuth={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
