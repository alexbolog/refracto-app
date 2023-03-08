import React from 'react';

export const NotConnected = () => {
  return (
    <div className='container-fluid not-connected-wrapper'>
      <div className='row'>
        <div className='col-12 text-center'>
          <h3>For more information Register or Connect your wallet</h3>
        </div>
        <div className='col-6 text-center'>
          <button className='btn btn-primary w-100'>Register</button>
        </div>
        <div className='col-6 text-center'>
          <button className='btn btn-primary btn-connect text-primary'>
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  );
};
