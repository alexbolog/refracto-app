import React from 'react';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core/hooks';
import { logout } from '@elrondnetwork/dapp-core/utils';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { routeNames } from 'routes';
import { ReactComponent as ElrondLogo } from './../../../assets/img/elrond.svg';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <ElrondLogo className='elrond-logo' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>

        <Nav className='ml-auto'>
          <NavItem>
            {/* <button className='btn btn-link'>Projects</button> */}
            <Link to={routeNames.projects} className='btn btn-link'>
              Projects
            </Link>
          </NavItem>
          <NavItem>
            <Link to={routeNames.marketplace} className='btn btn-link'>
              Marketplace
            </Link>
          </NavItem>
          {isLoggedIn && (
            <>
              <NavItem>
                <Link to={routeNames.account} className='btn btn-link'>
                  Account
                </Link>
              </NavItem>
              <NavItem>
                <button className='btn btn-link' onClick={handleLogout}>
                  Close
                </button>
              </NavItem>
            </>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
