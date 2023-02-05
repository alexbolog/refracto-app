import React, { useContext, useEffect, useState } from 'react';
import PaymentStatusEntry from './PaymentStatusEntry';
import ExpandFooter from '../ExpandFooter';
import { GeneralContext } from 'contexts/GeneralContext';
import { Payment } from 'types/accountTypes';
import { formatDateOnly } from 'utils';
import { PaymentStatuses } from 'enums';

const PaymentStatusContainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { accountOverview } = useContext(GeneralContext);
  useEffect(() => {
    console.log(accountOverview?.payments);
  }, []);
  return (
    <div className='col-lg-12 col-sm-12 col-md-12'>
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

          {accountOverview?.payments.map((p: Payment, i: number) =>
            !isExpanded && i > 4 ? null : (
              <PaymentStatusEntry
                paymentStatus={p.paymentStatus}
                amount={p.paymentAmount}
                projectName={p.projectTitle}
                date={formatDateOnly(new Date(p.date))}
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
              Expand <ExpandIcon />
            </p>
          )}
          {isExpanded && (
            <p
              className='text-primary'
              style={{ padding: '15px', marginRight: '10px' }}
              role='button'
              onClick={() => setIsExpanded(false)}
            >
              Collapse <ExpandIcon />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentStatusContainer;
