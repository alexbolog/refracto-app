import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ExistingPairing = ({
  onExistingPairConnect,
  onRemoveExistingPair
}: {
  onExistingPairConnect: () => void;
  onRemoveExistingPair: () => void;
}) => {
  return (
    <div className='card w-75 mb-0'>
      <div className='card-body existing-pairing'>
        <div className='w-25 text-center' onClick={onExistingPairConnect}>
          <img
            src='https://cdn.multiversx.com/xportal/logo_wc.jpg'
            alt='xPortal wallet connect logo'
          />
        </div>
        <div className='w-50 text-center' onClick={onExistingPairConnect}>
          <h5>xPortal Wallet</h5>
          <h6>(https://xportal.com)</h6>
        </div>
        <div className='w-25 text-end'>
          <button className='btn btn-white' onClick={() => onRemoveExistingPair()}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingPairing;
