import { toLocaleStringOptions } from 'config';
import { AccountContext } from 'contexts/AccountContext';
import React, { useContext } from 'react';
import { ProjectPageDetails, FullProjectPageDetails } from 'types/projectTypes';

export const InvestmentCard = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  const { availableCashBalance } = useContext(AccountContext);
  return (
    <div className='card investment-card-wrapper'>
      {/* TODO: replace bg-primary with primary color circle CSS background from design */}
      <div className='card-body p-0 bg-primary rounded'>
        <div className='container-fluid'>
          <div className='row p-0 w-100'>
            <div className='col-lg-6 d-flex justify-content-start align-items-end'>
              <h1 className='text-white'>Make an investment</h1>
            </div>
            <div className='col-lg-6 d-flex justify-content-end align-items-end'>
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
            </div>
          </div>
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
                />
              </div>
            </div>
            <div className='col-lg-3 d-flex justify-content-center align-items-end'>
              <button className='btn btn-primary text-primary btn-sm'>
                Submit Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
