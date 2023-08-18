import React, { useContext, useEffect, useState } from 'react';
import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { routeNames } from 'routes';
import ReactGA from 'react-ga4';
import { AccountContext } from 'contexts/AccountContext';

import { useDispatch } from '@multiversx/sdk-dapp/reduxStore/DappProviderContext';
import { loginAction } from '@multiversx/sdk-dapp/reduxStore/commonActions';
import { LoginMethodsEnum } from '@multiversx/sdk-dapp/types';
import { Modal } from 'react-bootstrap';

import { useExtensionConnect } from './hooks/useExtensionConnect';
import { useWebWalletConnect } from './hooks/useWebWalletConnect';
import { useHardwareWalletConnect } from './hooks/useHardwareWalletConnect';
import { useXPortalConnect } from './hooks/useXPortalConnect';
import XPortalConnectModal from './components/XPortalConnectModal';

export const UnlockRoute: () => JSX.Element = () => {
  const isLoggedIn = useGetIsLoggedIn();
  const { authToken } = useContext(AccountContext);
  const [showXPortalConnectModal, setShowXPortalConnectModal] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    } else {
      ReactGA.event({
        category: 'engagement',
        action: 'login_1',
        label: 'User went to login page'
      });
    }
  }, [isLoggedIn]);

  const dispatchSuccessfulLogin = (
    address: string,
    loginMethod: LoginMethodsEnum
  ) => {
    dispatch(loginAction({ address, loginMethod }));
  };

  const handleExtensionConnect = useExtensionConnect(
    authToken,
    dispatchSuccessfulLogin
  );
  const handleWebWalletConnect = useWebWalletConnect(
    authToken,
    dispatchSuccessfulLogin
  );
  const handleHardwareWalletConnect = useHardwareWalletConnect(
    authToken,
    dispatchSuccessfulLogin
  );
  const [handleXPortalConnect, qrcodeSvg] = useXPortalConnect(
    authToken,
    dispatchSuccessfulLogin,
    () => setShowXPortalConnectModal(true),
    () => setShowXPortalConnectModal(false)
  );

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
            <XPortalConnectModal
              show={showXPortalConnectModal}
              onHide={() => setShowXPortalConnectModal(false)}
              qrcodeSvg={qrcodeSvg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
