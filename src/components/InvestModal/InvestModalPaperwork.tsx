import React from 'react';
import { NUMBER_OF_SHARES_PER_PROJECT } from 'config';
import moment from 'moment';
import Slider from 'react-input-slider';
import { routeNames } from 'routes';
import { Link } from 'react-router-dom';
import LoremIpsum from './LoremIpsum.json';

const InvestModalPaperwork = ({
  projectDetails,
  closeModal,
  canProceed,
  onNavigateBack,
  onUserAgreement,
  investmentAmount,
  pricePerShare,
  sharesToReceive
}: {
  projectDetails: any;
  closeModal: () => void;
  canProceed: boolean;
  onNavigateBack: () => void;
  onUserAgreement: () => void;
  investmentAmount: number;
  pricePerShare: number;
  sharesToReceive: number;
}) => {
  return (
    <div className='container'>
      <div className='row mb-4'>
        <div className='col-lg-12'>
          <h2>Invest in {projectDetails.name}</h2>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-lg-12 d-flex justify-content-center'>
          <textarea
            rows={10}
            cols={100}
            disabled
            defaultValue={LoremIpsum.content}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col'>
          <h6>
            Proceeding is considered to be your agreement on the above mentioned
            facts.
            <br />
            The purchased assets will arrive in your account as soon as the
            payment is confirmed.
          </h6>
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col'>
          <h3>
            You have opted in for purchasing {sharesToReceive} shares for a
            price of {pricePerShare}$ per share, totalling {investmentAmount}$.
          </h3>
        </div>
      </div>
      <div className='row'>
        {canProceed && (
          <div className='col d-flex justify-content-center'>
            <button className='btn btn-success' onClick={onUserAgreement}>
              Agree and proceed
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
          <button className='btn btn-primary' onClick={onNavigateBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestModalPaperwork;
