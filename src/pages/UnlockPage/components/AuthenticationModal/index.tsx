import { AccountContext } from 'contexts/AccountContext';
import { useContext } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const AuthenticationModal = () => {
  const { connectionValidationStatus } = useContext(AccountContext);

  return (
    <Modal
      show={
        connectionValidationStatus !== ConnectionValidationStatus.NOT_STARTED
      }
      centered
      size='lg'
    >
      <Modal.Body className='container'>
        <div className='row'>
          <div className='col-12'>
            {connectionValidationStatus ===
              ConnectionValidationStatus.STARTED && (
              <>
                <div className='d-flex justify-content-center mt-3'>
                  <Spinner animation={'border'} />
                </div>
                <div className='d-flex justify-content-center mt-2 mb-3'>
                  Authentication in progress...
                </div>
              </>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export enum ConnectionValidationStatus {
  NOT_STARTED,
  STARTED,
  SUCCESSFUL,
  FAILED
}

export default AuthenticationModal;
