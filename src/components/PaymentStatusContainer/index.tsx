import React from 'react';
import PaymentStatusEntry, { PaymentStatuses } from './PaymentStatusEntry';
import { ReactComponent as ExpandIcon } from '../../assets/icons/refracto/arrow-down.svg';

const PaymentStatusContainer = () => {
  return (
    <div className='card'>
      <div className='card-header d-flex justify-content-between'>
        <h3>Payments Status</h3>
        {/* TBD dropdown */}
        <button className='btn btn-primary disabled'>Sort payments</button>
      </div>
      <div className='card-body row'>
        <div className='col-lg-3 d-flex justify-content-left p-3'>
          <h4>
            <strong>Date</strong>
          </h4>
        </div>
        <div className='col-lg-3 d-flex justify-content-left p-3'>
          <h4>
            <strong>Project Name</strong>
          </h4>
        </div>
        <div className='col-lg-3 d-flex justify-content-left p-3'>
          <h4>
            <strong>Payment Status</strong>
          </h4>
        </div>
        <div className='col-lg-3 d-flex justify-content-left p-3'>
          <h4>
            <strong>Payment Amount</strong>
          </h4>
        </div>

        <PaymentStatusEntry
          paymentStatus={PaymentStatuses.PENDING}
          amount={2678}
          projectName={'Bulevardul Timisoarei 128A, Bucharest'}
          date={'14-10-2022'}
        />
        <PaymentStatusEntry
          paymentStatus={PaymentStatuses.PENDING}
          amount={2678}
          projectName={'Bulevardul Timisoarei 128A, Bucharest'}
          date={'14-10-2022'}
        />
        <PaymentStatusEntry
          paymentStatus={PaymentStatuses.EXPECTED}
          amount={2678}
          projectName={'Bulevardul Timisoarei 128A, Bucharest'}
          date={'14-10-2022'}
        />
        <PaymentStatusEntry
          paymentStatus={PaymentStatuses.CLAIMED}
          amount={2678}
          projectName={'Bulevardul Timisoarei 128A, Bucharest'}
          date={'14-10-2022'}
        />
        <PaymentStatusEntry
          paymentStatus={PaymentStatuses.CLAIMED}
          amount={2678}
          projectName={'Bulevardul Timisoarei 128A, Bucharest'}
          date={'14-10-2022'}
        />
      </div>
      <div
        className='card-footer d-flex justify-content-end'
        style={{ padding: '0' }}
      >
        <p
          className='text-primary'
          style={{ padding: '15px', marginRight: '10px', cursor: 'pointer' }}
        >
          Expand <ExpandIcon />
        </p>
      </div>
    </div>
  );
};

export default PaymentStatusContainer;