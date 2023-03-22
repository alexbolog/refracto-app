import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import { routeNames } from 'routes';
import routes from 'routes';
import UnlockPage from './pages/UnlockPage';
import ReactGA from 'react-ga4';
import { AccountContextProvider } from 'contexts/AccountContext';
import { ProjectContextProvider } from 'contexts/ProjectContext';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal
} from '@multiversx/sdk-dapp/UI';
import {
  DappProvider,
} from '@multiversx/sdk-dapp/wrappers';

const environment = EnvironmentsEnum.devnet;

const TRACKING_ID = 'G-M4H6XH3NSB';
ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.send('pageview');
  }, []);

  return (
    <Router>
      <DappProvider
        environment={environment}
        customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
      >
        <ProjectContextProvider>
          <AccountContextProvider>
            <Layout>
              <TransactionsToastList />
              <NotificationModal />
              <SignTransactionsModals className='custom-class-for-modals' />
              <Routes>
                <Route path={routeNames.unlock} element={<UnlockPage />} />
                {routes.map((route: any, index: number) => (
                  <Route
                    path={route.path}
                    key={'route-key-' + index}
                    element={<route.component />}
                  />
                ))}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </Layout>
          </AccountContextProvider>
        </ProjectContextProvider>
      </DappProvider>
    </Router>
  );
};

export default App;
