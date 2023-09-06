import { useState } from 'react';
import ConfirmSelectedAddressStatus from './ConfirmSelectedAddressStatus';
import ConnectLedgerErrorStatus from './ConnectLedgerErrorStatus';
import ConnectLedgerStatus from './ConnectLedgerStatus';
import SelectLedgerAddressStatus from './SelectLedgerAddressStatus';
import './style.css';

const StatusContainer = ({
  status,
  addresses,
  errorMessage,
  onSelectAddressIndex
}: {
  status: StatusTypes;
  addresses: string[];
  errorMessage?: string;
  onSelectAddressIndex: (index: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleSelection = (index: number) => {
    setSelectedIndex(index);
    onSelectAddressIndex(index);
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-center mb-3'>
          <h4>Connect with Ledger</h4>
        </div>
        {status === StatusTypes.CONNECT_LEDGER && <ConnectLedgerStatus />}
        {status === StatusTypes.SELECT_ADDRESS && (
          <SelectLedgerAddressStatus
            addresses={addresses}
            onSelectAddressIndex={handleSelection}
          />
        )}
        {status === StatusTypes.CONFIRM_ADDRESS && (
          <ConfirmSelectedAddressStatus
            selectedAddress={addresses[selectedIndex]}
          />
        )}
        {status === StatusTypes.CONNECT_LEDGER_ERROR && (
          <ConnectLedgerErrorStatus errorMessage={errorMessage} />
        )}
      </div>
    </div>
  );
};

export default StatusContainer;

export enum StatusTypes {
  CONNECT_LEDGER,
  SELECT_ADDRESS,
  CONFIRM_ADDRESS,
  CONNECT_LEDGER_ERROR
}
