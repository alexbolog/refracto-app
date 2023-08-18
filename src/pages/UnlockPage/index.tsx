import React, { useContext } from 'react';
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
  setAccount,
  setAddress,
  setTokenLoginSignature
} from '@multiversx/sdk-dapp/reduxStore/slices';
import { useDispatch } from '@multiversx/sdk-dapp/reduxStore/DappProviderContext';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { setAccountProvider } from '@multiversx/sdk-dapp/providers/accountProvider';
import { getSupabaseAuthHeaders } from 'apiRequests/backend/accountApi';

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
            <LedgerLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Ledger'}
              token={authToken}
              nativeAuth={true}
            />
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
