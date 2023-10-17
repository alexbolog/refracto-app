import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { LoremIpsum } from './LoremIpsum';

export const InvestmentModalButton = ({
  amount,
  projectId
}: {
  amount: number;
  projectId: number;
}) => {
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const handleInvest = async () => {
    setShowAgreementModal(true);
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
          <h3>
            Read and accept the following agreement to proceed with your
            investment.
          </h3>
          <LoremIpsum />
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            onClick={() => setShowAgreementModal(false)}
          >
            Decline
          </button>
          <button className='btn btn-success' onClick={handleInvest}>
            Accept & Invest
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
