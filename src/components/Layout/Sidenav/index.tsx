import React from 'react';
import {
  faArrowRightFromBracket,
  faBars,
  faBoltLightning,
  faCircleUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { logout } from '@multiversx/sdk-dapp/utils';
import { Link, useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import CurrencyPicker from 'components/CurrencyPicker';
import insertProjects from 'mock-scripts/projects';
import { NAVBAR_MENU_ITEMS, routeNames } from 'routes';
import { getIsMobile } from 'utils';
import { ReactComponent as HelpIcon } from '../../../assets/icons/refracto/help.svg';
import { ReactComponent as NotificationsIcon } from '../../../assets/icons/refracto/notifications.svg';
import { ReactComponent as Logo } from './../../../assets/icons/refracto/logo.svg';
import AccountInfo from './AccountInfo';
import NotificationDropDownContent from './NotificationDropDownContent';
// import { randomizeInsertProject } from 'db/projects';

import './style.scss';

const Sidenav = () => {
  const { address } = useGetAccountInfo();
  const [hasNotifications, setHasNotifications] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(`${window.location.origin}/`);
  };
  const isLoggedIn = Boolean(address);
  const handleCollapse = () => {
    const nav = document.getElementById('main-wrapper');
    nav?.classList.toggle('menu-toggle');
    const navControl = document.getElementsByClassName('hamburger')[0];
    navControl.classList.toggle('is-active');
  };

  const handleCloseNavbar = () => {
    const isMobile = getIsMobile();
    const nav = document.getElementById('main-wrapper');
    const navControl = document.getElementsByClassName('hamburger')[0];

    if (
      isMobile &&
      nav?.classList.contains('menu-toggle') &&
      navControl.classList.contains('is-active')
    ) {
      nav?.classList.toggle('menu-toggle');
      navControl.classList.toggle('is-active');
    }
  };

  const NavLink = (data: any, i: number) => {
    if (data.protectedRoute && !isLoggedIn) {
      return null;
    }
    return (
      <>
        <li
          key={`side-nav-item-key-${i}-${data.display}`}
          className={
            location.pathname === data.route ? 'mm-active fade-in' : ''
          }
          onClick={handleCloseNavbar}
        >
          <Link to={data.route} className='d-flex align-items-center'>
            {/* <FontAwesomeIcon icon={data.icon} data-tip={data.display} /> */}
            {/* {() => data.icon} */}
            <data.icon data-tip={data.display} style={{ padding: '0' }} />
            <span className='nav-text'>{data.display}</span>
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <div className='nav-header'>
        <Link
          to={routeNames.home}
          className='brand-logo'
          style={{ backgroundColor: '#6853E8' }}
        >
          <Logo width={40} height={40} className='logo-abbr' />
          <div className='brand-title'>
            <img
              src='./logo-text.png'
              alt='brand-logo'
              style={{ maxHeight: '50px', maxWidth: '150px', marginTop: '3px' }}
            />
            {/* <LogoText /> */}
          </div>
        </Link>
        <div className='nav-control' onClick={handleCollapse}>
          <FontAwesomeIcon
            icon={faBars}
            className='hamburger'
            style={{ color: 'white' }}
          />
        </div>
      </div>
      <div className='header' style={{ backgroundColor: '#4e37cb' }}>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left'>{/* <SearchBar /> */}</div>
              {isLoggedIn && (
                <ul className='navbar-nav header-right'>
                  {/*<li className='nav-item'>*/}
                  {/*  <CurrencyPicker />*/}
                  {/*</li>*/}
                  <li
                    className={`nav-item dropdown notification_dropdown ${
                      hasNotifications ? 'has-notifications' : ''
                    }`}
                  >
                    <a
                      className='nav-link '
                      href='#'
                      role='button'
                      data-bs-toggle='dropdown'
                      data-bs-auto-close='outside'
                      style={{ marginRight: '20px' }}
                    >
                      <NotificationsIcon />
                    </a>
                    <NotificationDropDownContent />
                  </li>

                  <li className='nav-item dropdown notification_dropdown'>
                    <a className='nav-link ' href='#'>
                      <HelpIcon />
                    </a>
                  </li>
                  <li className='nav-item'>
                    <AccountInfo />
                  </li>
                </ul>
              )}
              {!isLoggedIn && (
                <ul className='navbar-nav header-right'>
                  <li
                    className='nav-item text-white'
                    role='button'
                    onClick={() => navigate(routeNames.unlock)}
                  >
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      size='2x'
                      color='white'
                      className='mr-2'
                    />
                    Connect
                  </li>
                </ul>
              )}
            </div>
          </nav>
        </div>
      </div>
      <div className='dlabnav'>
        <div className='dlabnav-scroll'>
          <ul className='metismenu' id='menu' style={{ height: '100%' }}>
            {/* <li style={{ marginTop: '35%' }}>
              <ul aria-expanded='false'>
                {NAVBAR_MENU_ITEMS.map((data, i) => NavLink(data, i))}
              </ul>
            </li> */}
            <>{NAVBAR_MENU_ITEMS.map((data, i) => NavLink(data, i))}</>
            <li style={{ marginTop: 'auto' }}>
              {!isLoggedIn && (
                <Link
                  to={routeNames.unlock}
                  className='d-flex align-items-center'
                >
                  <FontAwesomeIcon icon={faBoltLightning} data-tip='Connect' />
                  <span className='nav-text'>Connect</span>
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to='#'
                  onClick={handleLogout}
                  className='d-flex align-items-center'
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    data-tip='Disconnect'
                  />
                  <span className='nav-text'>Disconnect</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <ReactTooltip />
      </div>
    </>
  );
};

export default Sidenav;
