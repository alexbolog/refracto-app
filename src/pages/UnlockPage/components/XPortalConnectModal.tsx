import React from 'react';
import { Modal } from 'react-bootstrap';

const XPortalConnectModal = ({
  show,
  onHide,
  qrcodeSvg
}: {
  show: boolean;
  onHide: () => void;
  qrcodeSvg: string;
}) => (
  <Modal show={show} centered size='xl'>
    <Modal.Header>XPortal Connect</Modal.Header>
    <Modal.Body>
      <div>
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrcodeSvg)}`} />
      </div>
    </Modal.Body>
    <Modal.Footer>
      <button className='btn btn-danger' onClick={onHide}>
        Dismiss
      </button>
    </Modal.Footer>
  </Modal>
);

export default XPortalConnectModal;
