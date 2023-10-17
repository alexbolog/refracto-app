import * as React from 'react';
import Actions from './Actions';
import TopInfo from './TopInfo';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { useGetIsKycCompliant } from 'sc/queries/useGetIsKycCompliant';
import { useMockKyc } from 'sc/transactions/useMockKyc';
import { useMintDemoUSDC } from 'sc/transactions/useMintDemoUSDC';
import { useCreateMockProject } from 'helpers/useCreateMockProject';

const Account = () => {
  const { address } = useGetAccountInfo();
  const hasKyc = useGetIsKycCompliant();
  const mockKyc = useMockKyc();
  const mockProject = useCreateMockProject();
  const mintTestUsdc = useMintDemoUSDC();

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 text-start'>
          <div className='card'>
            <div className='card-header'>
              <h2>Account Information</h2>
            </div>
            <div className='card-body container-fluid'>
              <div className='row'>
                <div className='col-lg-12 text-start'>
                  Address: <code className='text-black'>{address}</code>
                </div>
                <div className='col-lg-12 text-start'>
                  KYC Status:{' '}
                  {!hasKyc && <span className='text-black'>Not done</span>}
                  {hasKyc && <span className='text-success'>Done</span>}
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-lg-6 col-md-12'>
                  <button className='btn btn-primary' onClick={mockProject}>
                    Insert Random Project
                  </button>
                </div>
              </div>
              <div className='row mt-2'>
                {!hasKyc && (
                  <div className='col-lg-6 col-md-12'>
                    <button className='btn btn-primary' onClick={mockKyc}>
                      Mock Successful KYC
                    </button>
                  </div>
                )}
              </div>
              <div className='row mt-2'>
                {hasKyc && (
                  <div className='col-lg-6 col-md-12'>
                    <button className='btn btn-primary' onClick={mintTestUsdc}>
                      Mint test USDC
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
