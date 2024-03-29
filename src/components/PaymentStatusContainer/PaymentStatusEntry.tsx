import { toLocaleStringOptions } from 'config';
import { PaymentStatuses } from 'enums';
import React from 'react';
import { ReactComponent as DoneIcon } from '../../assets/icons/refracto/done.svg';

const PaymentStatusEntry = ({
  paymentStatus,
  amount,
  projectTitle,
  date
}: {
  paymentStatus: PaymentStatuses;
  amount: number;
  projectTitle: string;
  date: string;
}) => {
  const handleClaimPayment = () => {
    window.alert('todo');
  };
  const statusColumnComponent = () => {
    switch (paymentStatus) {
      case PaymentStatuses.CLAIMED:
        return (
          <div className='col-lg-3 d-flex justify-content-left p-3'>
            <h5>
              <DoneIcon className='mr-2' /> Paid
            </h5>
          </div>
        );
      case PaymentStatuses.EXPECTED:
        return (
          <div className='col-lg-3 d-flex justify-content-left p-3'>
            <h5 className='text-warning'>Expected</h5>
          </div>
        );
      case PaymentStatuses.PENDING:
        return (
          <div
            className='col-lg-3 d-flex justify-content-left p-3'
            // onClick={handleClaimPayment}
          >
            <h5 className='text-success'>Available</h5>
          </div>
        );
    }
  };

  const paymentAmountComponent = () => {
    if (paymentStatus === PaymentStatuses.PENDING) {
      return (
        <div className='col-lg-3 d-flex justify-content-left p-3 row'>
          <div className='col-lg-6 col-sm-6 col-md-6 text-left'>
            <h5>€{amount.toLocaleString(undefined, toLocaleStringOptions)}</h5>
          </div>
          <div
            className='col-lg-6 col-sm-6 col-md-6 d-flex justify-content-left'
            onClick={handleClaimPayment}
          >
            <h5 className='link'>Claim</h5>
          </div>
        </div>
      );
    } else
      return (
        <div className='col-lg-3 d-flex justify-content-left p-3'>
          <h5>€{amount.toLocaleString(undefined, toLocaleStringOptions)}</h5>
        </div>
      );
  };

  return (
    <>
      <div className='col-lg-3 d-flex justify-content-left p-3'>
        <h5>{date}</h5>
      </div>
      <div className='col-lg-3 d-flex justify-content-left p-3'>
        <h5>{projectTitle}</h5>
      </div>
      {statusColumnComponent()}
      {paymentAmountComponent()}
    </>
  );
};

export default PaymentStatusEntry;
