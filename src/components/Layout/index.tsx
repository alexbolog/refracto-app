import React from 'react';
import { AuthenticatedRoutesWrapper } from '@elrondnetwork/dapp-core/wrappers';
import { useLocation } from 'react-router-dom';
import routes, { routeNames } from 'routes';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidenav from './Sidenav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { search } = useLocation();
  React.useEffect(() => {
    fadePreloader();
    // setDarkModeJs();
  }, []);

  const setDarkModeJs = () => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    // eslint-disable-next-line quotes
    s.innerHTML = `${"jQuery(document).ready(function () {setTimeout(function () {dlabSettingsOptions.version = 'dark';new dlabSettings(dlabSettingsOptions);}, 800)});"}`;
    document.body.appendChild(s);
  };

  const fadePreloader = () => {
    const s2 = document.createElement('script');
    s2.type = 'text/javascript';
    s2.async = true;
    // eslint-disable-next-line quotes
    s2.innerHTML = `${"setTimeout(function () {jQuery('#preloader').remove();$('#main-wrapper').addClass('show');}, 800);"}`;
    document.body.appendChild(s2);
  };

  return (
    <>
      <div id='preloader'>
        {/* <div className='loader2 container'>
          <div className='row' style={{ marginTop: '25%' }}>
            <div className='col-lg-12 col-sm-12 d-flex justify-content-center'>
              <Logo style={{ maxWidth: '35%', maxHeight: '35%' }} />
              Logo
            </div>
            <div className='col-lg-12 col-sm-12 d-flex justify-content-center'>
              <h2>Loading..</h2>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div id='main-wrapper' data-theme-version={isDarkTheme ? 'dark' : ''}> */}
      <div id='main-wrapper'>
        {/* <Navbar /> */}
        <Sidenav />
        <main className='content-body d-flex justify-content-center'>
          <AuthenticatedRoutesWrapper
            routes={routes}
            unlockRoute={`${routeNames.unlock}${search}`}
          >
            <div className='container-fluid'>{children}</div>
          </AuthenticatedRoutesWrapper>
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
