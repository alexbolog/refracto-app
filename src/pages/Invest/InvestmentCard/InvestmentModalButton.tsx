import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { LoremIpsum } from './LoremIpsum';
import { toLocaleStringOptions } from 'config';
import { useInvest } from 'sc/transactions/useInvest';

export const InvestmentModalButton = ({
  amount,
  projectId
}: {
  amount: number;
  projectId: number;
}) => {
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const invest = useInvest();
  const handleInvestButton = async () => {
    await invest(projectId, amount);
    setShowAgreementModal(false);
  };

  return (
    <>
      <button
        className='btn btn-primary text-primary btn-sm invest-now-button'
        onClick={() => setShowAgreementModal(true)}
      >
        Submit Your Order
      </button>
      <Modal show={showAgreementModal} centered size='lg'>
        <Modal.Header closeButton>
          <h2>Investment Agreement</h2>
        </Modal.Header>
        <Modal.Body>
          <h5 className='mb-3'>
            Read and accept the following agreement to proceed with your €
            {amount.toLocaleString(undefined, toLocaleStringOptions)}{' '}
            investment.
          </h5>
          <LoremIpsum />
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            onClick={() => setShowAgreementModal(false)}
          >
            Decline
          </button>
          <button className='btn btn-success' onClick={handleInvestButton}>
            Accept & Invest
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
