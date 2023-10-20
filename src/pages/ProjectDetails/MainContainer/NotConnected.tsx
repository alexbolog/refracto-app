import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';

export const NotConnected = () => {
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate(routeNames.unlock);
  };
  return (
    <div className='container-fluid not-connected-wrapper'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h3>For more information Register or Connect your wallet</h3>
        </div>
        <div className='col-6 text-center'>
          <button
            className='btn btn-primary w-100'
            onClick={handleNavigateToLogin}
          >
            Register
          </button>
        </div>
        <div className='col-6 text-center'>
          <button
            className='btn btn-primary btn-connect text-primary'
            onClick={handleNavigateToLogin}
          >
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  );
};
