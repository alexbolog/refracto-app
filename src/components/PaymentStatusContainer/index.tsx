import React, { useContext, useEffect, useState } from 'react';
import PaymentStatusEntry from './PaymentStatusEntry';
import ExpandFooter from '../ExpandFooter';
import { AccountContext } from 'contexts/AccountContext';
import { Payment } from 'types/accountTypes';
import { formatIso } from 'utils';
import { DateTime } from 'luxon';

const PaymentStatusContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { accountOverview } = useContext(AccountContext);

  return (
    <div className='col-12'>
      <div className='card'>
        <div className='card-header d-flex justify-content-between'>
          <h3>Payments Status</h3>
          {/* TBD dropdown */}
          <button className='btn btn-primary disabled'>Sort payments</button>
        </div>
        <div className='card-body row'>
          <div className='col col-lg-3 d-flex justify-content-left p-3'>
            <h4>
              <strong>Date</strong>
            </h4>
          </div>
          <div className='col col-lg-3 d-flex justify-content-left p-3'>
            <h4>
              <strong>Project Name</strong>
            </h4>
          </div>
          <div className='col col-lg-3 d-flex justify-content-left p-3'>
            <h4>
              <strong>Payment Status</strong>
            </h4>
          </div>
          <div className='col col-lg-3 d-flex justify-content-left p-3'>
            <h4>
              <strong>Payment Amount</strong>
            </h4>
          </div>

          {accountOverview?.payments.map((p: Payment, i: number) =>
            !isExpanded && i > 4 ? null : (
              <PaymentStatusEntry
                paymentStatus={p.paymentStatus}
                amount={p.paymentAmount}
                projectTitle={p.projectTitle}
                date={formatIso(p.date, DateTime.DATE_FULL)}
                key={`payment-status-${p.projectId}-${i}`}
              />
            )
          )}
        </div>
        <div
          className='card-footer d-flex justify-content-end'
          style={{ padding: '0' }}
        >
          {!isExpanded && (
            <p
              className='text-primary'
              style={{ padding: '15px', marginRight: '10px' }}
              role='button'
              onClick={() => setIsExpanded(true)}
            >
              Expand <ExpandFooter />
            </p>
          )}
          {isExpanded && (
            <p
              className='text-primary'
              style={{ padding: '15px', marginRight: '10px' }}
              role='button'
              onClick={() => setIsExpanded(false)}
            >
              Collapse <ExpandFooter />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusContainer;
