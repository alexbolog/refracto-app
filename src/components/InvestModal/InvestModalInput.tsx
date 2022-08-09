import React from 'react';
import { NUMBER_OF_SHARES_PER_PROJECT } from 'config';
import moment from 'moment';
import Slider from 'react-input-slider';
import { routeNames } from 'routes';
import { Link } from 'react-router-dom';

const InvestModalInput = ({
  projectDetails,
  closeModal,
  canProceed,
  onProceed,
  pricePerShare,
  remainingShares
}: {
  projectDetails: any;
  closeModal: () => void;
  canProceed: boolean;
  onProceed: (inputInvestAmount: number) => void;
  pricePerShare: number;
  remainingShares: number;
}) => {
  const [investAmount, setInvestAmount] = React.useState(0);

  const forecastEarnings = () => {
    const monthsUntilDeadline =
      (projectDetails.deadline - moment.now()) / (30 * 24 * 3600 * 1000); // 30 days of 24 hrs, each made of 3600 * 1000 ms
    const monthlyEarnings =
      (investAmount * projectDetails.forecastedAPR) / 100 / 12;
    return investAmount + monthlyEarnings * monthsUntilDeadline;
  };

  const handleProceed = () => {
    onProceed(investAmount);
  };

  const imgStyle = {
    width: 'auto',
    height: 'auto',
    maxWidth: '350px'
  };
  return (
    <div className='container' style={{ padding: '30px' }}>
      <div className='row mb-4'>
        <div className='col'>
          <h2>Invest in {projectDetails.name}</h2>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-lg-12'>
          <img src={projectDetails.img} style={imgStyle} />
        </div>
      </div>
      <div className='row mb-3' style={{ width: '100%' }}>
        <div className='col-lg-4 d-flex justify-content-center'>
          <div>
            <h5>{remainingShares.toLocaleString()}</h5>
            <h6>Remaining shares</h6>
          </div>
        </div>
        <div className='col-lg-4 d-flex justify-content-center'>
          <div>
            <h5>{pricePerShare.toLocaleString()} $</h5>
            <h6>Price per share</h6>
          </div>
        </div>
        <div className='col-lg-4 d-flex justify-content-center'>
          <div>
            <h5>{projectDetails.forecastedAPR.toLocaleString()}%</h5>
            <h6>Forecasted APR</h6>
          </div>
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Shares to receive: {investAmount / pricePerShare}
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Amount to receive when contract is over:{' '}
          {forecastEarnings().toLocaleString()} $
        </div>
      </div>
      <div className='row mb-1'>
        <div className='col-lg-12 d-flex justify-content-center'>
          <Slider
            axis='x'
            x={investAmount}
            xmin={0}
            xmax={1000}
            onChange={(v) => setInvestAmount(v.x)}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-lg-12 d-flex justify-content-center'>
          Amount to invest: {investAmount} $
        </div>
      </div>
      <div className='row'>
        {canProceed && (
          <div className='col d-flex justify-content-center'>
            <button className='btn btn-success' onClick={handleProceed}>
              Proceed
            </button>
          </div>
        )}
        {!canProceed && (
          <div className='col d-flex justify-content-center'>
            <Link to={routeNames.unlock} className='btn btn-success'>
              Connect ⚡️
            </Link>
          </div>
        )}
        <div className='col d-flex justify-content-center'>
          <button className='btn btn-primary' onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestModalInput;
