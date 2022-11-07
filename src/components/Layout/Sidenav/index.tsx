import React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { Link } from 'react-router-dom';
import { NAVBAR_MENU_ITEMS, routeNames } from 'routes';
import { faBars, faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const Sidenav = () => {
  const { address } = useGetAccountInfo();
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
    const width = window.innerWidth;
    const isMobile = width <= 768;
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
            <FontAwesomeIcon icon={data.icon} data-tip={data.display} />
            <span className='nav-text'>{data.display}</span>
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <div className='nav-header'>
        <Link to={routeNames.home} className='brand-logo'>
          Logo
          {/* <Logo width={40} height={40} className='logo-abbr' /> */}
          {/* <svg
            className='logo-abbr'
            width='40'
            height='40'
            viewBox='0 0 64 61'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7.0188 22.6571H56.1512L49.1323 33.9857H28.0756L38.6039 49.6714L31.585 61L7.0188 22.6571Z'
              fill='var(--primary)'
            />
            <path
              d='M7.01891 0H56.1513L63.1702 12.2H0L7.01891 0Z'
              fill='var(--primary)'
            />
          </svg> */}
          <div className='brand-title'>
            {/* <Logo width={40} height={40} className='logo-abbr' /> */}
            <img
              src='images/aoz/logoaoz.png'
              alt='brand-logo'
              style={{ maxHeight: 50 }}
            />
          </div>
        </Link>
        <div className='nav-control' onClick={handleCollapse}>
          {/* <div className='hamburger'>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
            <svg
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect x='22' y='11' width='4' height='4' rx='2' fill='#2A353A' />
              <rect x='11' width='4' height='4' rx='2' fill='#2A353A' />
              <rect x='22' width='4' height='4' rx='2' fill='#2A353A' />
              <rect x='11' y='11' width='4' height='4' rx='2' fill='#2A353A' />
              <rect x='11' y='22' width='4' height='4' rx='2' fill='#2A353A' />
              <rect width='4' height='4' rx='2' fill='#2A353A' />
              <rect y='11' width='4' height='4' rx='2' fill='#2A353A' />
              <rect x='22' y='22' width='4' height='4' rx='2' fill='#2A353A' />
              <rect y='22' width='4' height='4' rx='2' fill='#2A353A' />
            </svg>
          </div> */}
          <FontAwesomeIcon icon={faBars} className='hamburger' />
        </div>
      </div>
      <div className='header'>
        <div className='header-content'>
          <nav className='navbar navbar-expand'>
            <div className='collapse navbar-collapse justify-content-between'>
              <div className='header-left'>{/* <SearchBar /> */}</div>
            </div>
          </nav>
        </div>
      </div>
      {/* <div
        className='side-nav-collapse'
        onClick={handleCollapse}
        style={{ fontSize: '30px', position: 'absolute', zIndex: '25' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div> */}
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
