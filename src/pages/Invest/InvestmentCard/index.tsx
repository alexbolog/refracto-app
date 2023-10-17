import { useGetIsLoggedIn } from '@multiversx/sdk-dapp/hooks';
import { toLocaleStringOptions } from 'config';
import { AccountContext } from 'contexts/AccountContext';
import React, { useContext, useState } from 'react';
import { ProjectPageDetails, FullProjectPageDetails } from 'types/projectTypes';
import { InvestmentModalButton } from './InvestmentModalButton';

export const InvestmentCard = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  const { availableCashBalance } = useContext(AccountContext);
  const [investmentAmount, setInvestmentAmount] = useState<number>();
  const handleUpdateInvestmentAmount = (e: any) => {
    const amount = parseFloat(e.target.value);
    if (amount > availableCashBalance || amount < 0) {
      setInvestmentAmount(availableCashBalance);
    } else {
      setInvestmentAmount(amount);
    }
  };

  const isLoggedIn = useGetIsLoggedIn();

  return (
    <div className='card investment-card-wrapper'>
      {/* TODO: replace bg-primary with primary color circle CSS background from design */}
      <div className='card-body p-0 bg-primary rounded'>
        <div className='container-fluid'>
          <div className='row '>
            <div className='col-lg-6 col-sm-12 d-flex justify-content-start align-items-end'>
              <h1 className='text-white'>Make an Investment</h1>
            </div>
            <div className='col-lg-6 col-sm-12 d-flex justify-content-end align-items-end available-balance'>
              {isLoggedIn && (
                <h4 className='text-white'>
                  CASH BALANCE:{' '}
                  <span className='text-success'>
                    €
                    {availableCashBalance.toLocaleString(
                      undefined,
                      toLocaleStringOptions
                    )}
                  </span>
                </h4>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <div className='row'>
              <div className='col-lg-9 d-flex justify-content-start align-items-end'>
                <div className='w-100'>
                  <label htmlFor='investment-input' className='text-white'>
                    Your Investment Amount
                  </label>
                  <input
                    id='investment-input'
                    type='number'
                    className='form-control input-default w-100'
                    placeholder='Example: €500'
                    step={10}
                    value={investmentAmount}
                    onChange={handleUpdateInvestmentAmount}
                  />
                </div>
              </div>
              <div className='col-lg-3 col-md-12 d-flex justify-content-center align-items-end'>
                <InvestmentModalButton
                  amount={investmentAmount ?? 0}
                  projectId={project.projectId}
                />
              </div>
            </div>
          ) : (
            <div className='row'>
              <div className='col-12'>
                <label className='text-white mt-2'>
                  In order to get acces to market investment you need an
                  account.
                </label>
              </div>
              <div className='col-12'>
                <button className='btn btn-primary text-primary btn-sm w-25 mt-3'>
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
