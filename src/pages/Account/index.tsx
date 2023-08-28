import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

const Account = () => {
  const { address } = useGetAccountInfo();

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              {/* <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
              <Transactions /> */}
              <div>
                <h1>Welcome to the Account page</h1>
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
