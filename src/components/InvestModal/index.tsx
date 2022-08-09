import React from 'react';

const InvestModal = ({
  projectDetails,
  closeModal
}: {
  projectDetails: any;
  closeModal: () => void;
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h3>Invest in {projectDetails.name}</h3>
        </div>
      </div>
      <div className='row' style={{ width: '100%' }}>
        <div className='col-lg-6'>
          <h5>Remaining shares: {(123456).toLocaleString()}</h5>
        </div>
        <div className='col-lg-6'></div>
      </div>
      <div className='row'>
        <div className='col'>
          <button className='btn btn-primary' onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestModal;
