import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import StatusContainer, { StatusTypes } from './StatusContainer';

export const HarwareWalletConnectModal = ({
  show,
  onHide,
  addresses,
  onSelectAddress,
  errorMessage
}: {
  show: boolean;
  onHide: () => void;
  addresses: string[];
  onSelectAddress: (addressIndex: number) => void;
  errorMessage?: string;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<StatusTypes>(
    StatusTypes.CONNECT_LEDGER
  );

  const handleSelectAddress = () => {
    if (selectedIndex >= 0) {
      onSelectAddress(selectedIndex);
      setShowConfirmationMessage(true);
    }
  };

  const handleDismiss = () => {
    setSelectedIndex(-1);
    setShowConfirmationMessage(false);
    setCurrentStatus(StatusTypes.CONNECT_LEDGER);
    onHide();
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      setCurrentStatus(StatusTypes.CONNECT_LEDGER_ERROR);
      setSelectedIndex(-1);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (addresses.length > 0) {
      setCurrentStatus(StatusTypes.SELECT_ADDRESS);
    }
  }, [addresses]);

  useEffect(() => {
    if (showConfirmationMessage) {
      setCurrentStatus(StatusTypes.CONFIRM_ADDRESS);
    }
  }, [showConfirmationMessage]);

  return (
    <Modal show={show} centered size='lg'>
      <Modal.Header>Connect with Hardware Wallet</Modal.Header>
      <Modal.Body>
        <StatusContainer
          status={currentStatus}
          addresses={addresses}
          onSelectAddressIndex={(index) => setSelectedIndex(index)}
          errorMessage={errorMessage}
        />
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between w-100'>
        <button
          className='btn btn-primary'
          onClick={handleSelectAddress}
          disabled={
            selectedIndex < 0 || currentStatus !== StatusTypes.SELECT_ADDRESS
          }
        >
          Select
        </button>
        <button className='btn btn-secondary' onClick={handleDismiss}>
          Dismiss
        </button>
      </Modal.Footer>
    </Modal>
  );
};
