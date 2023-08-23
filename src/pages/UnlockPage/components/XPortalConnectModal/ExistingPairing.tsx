import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';

const ExistingPairing = ({
  onExistingPairConnect,
  onRemoveExistingPair
}: {
  onExistingPairConnect: () => void;
  onRemoveExistingPair: () => void;
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const handleConnect = () => {
    setIsConnecting(true);
    onExistingPairConnect();
  };
  return (
    <div className='card w-75 mb-0'>
      <div className='card-body existing-pairing'>
        {!isConnecting && (
          <>
            <div className='w-25 text-center' onClick={handleConnect}>
              <img
                src='https://cdn.multiversx.com/xportal/logo_wc.jpg'
                alt='xPortal wallet connect logo'
              />
            </div>
            <div className='w-50 text-center' onClick={handleConnect}>
              <h5>xPortal Wallet</h5>
              <h6>(https://xportal.com)</h6>
            </div>
            <div className='w-25 text-end'>
              <button
                className='btn btn-white'
                onClick={() => onRemoveExistingPair()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </>
        )}
        {isConnecting && (
          <div className='confirmation-message'>
            <Spinner animation='border' variant='primary' />
            <h5>Confirm on xPortal</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingPairing;
