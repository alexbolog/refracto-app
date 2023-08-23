import React from 'react';
import { Modal } from 'react-bootstrap';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ExistingPairing from './ExistingPairing';

const XPortalConnectModal = ({
  show,
  onHide,
  qrcodeSvg,
  deepLink,
  existingPairings,
  onExistingPairConnect,
  onRemoveExistingPair
}: {
  show: boolean;
  onHide: () => void;
  qrcodeSvg: string;
  deepLink: string;
  existingPairings: any[];
  onExistingPairConnect: (topic: string) => void;
  onRemoveExistingPair: (topic: string) => void;
}) => {
  return (
    <Modal show={show} centered size='lg'>
      <Modal.Body>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 text-center'>
              <h1>Connect using xPortal</h1>
              <h4 className='mb-4'>Scan the QR code using the xPortal App</h4>
            </div>
            <div className='col-12 text-center'>
              <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(qrcodeSvg)}`}
                className='qr-code'
              />
            </div>
            <div className='col-12 text-center mobile-only'>
              <a
                className='btn btn-primary'
                target='_blank'
                rel='noopener noreferrer nofollow'
                href={deepLink}
              >
                ⚡️ xPortal Mobile Wallet
              </a>
            </div>
            {existingPairings.length > 0 && (
              <>
                <div className='col-12 text-center'>
                  <h6 className='mt-4'>or choose an existing pairing:</h6>
                </div>
                {existingPairings.map((pairing: any, index: number) => (
                  <div
                    className='col-12 d-flex justify-content-center'
                    key={`wallet-connect-existing-pairing-${index}-${pairing.topic}`}
                  >
                    <ExistingPairing
                      onExistingPairConnect={() =>
                        onExistingPairConnect(pairing.topic)
                      }
                      onRemoveExistingPair={() =>
                        onRemoveExistingPair(pairing.topic)
                      }
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-danger' onClick={onHide}>
          Dismiss
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default XPortalConnectModal;
