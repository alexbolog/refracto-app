import React from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { routeNames } from 'routes';
import ReactGA from 'react-ga4';
import {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
} from '@multiversx/sdk-dapp/UI';

export const UnlockRoute: () => JSX.Element = () => {
  const isLoggedIn = useGetIsLoggedIn();

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
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Web wallet'}
            />
            <LedgerLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'Ledger'}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={'xPortal'}
              isWalletConnectV2={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
