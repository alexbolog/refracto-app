import { Spinner } from 'react-bootstrap';

const SelectLedgerAddressStatus = ({
  addresses,
  onSelectAddressIndex
}: {
  addresses: string[];
  onSelectAddressIndex: (index: number) => void;
}) => {
  return (
    <>
      <div className='col-12 text-center mb-2'>
        Select one of the addresses below to proceed
      </div>
      <div className='col-12 text-center'>
        <select
          className='form-select p-2'
          style={{ minHeight: '50vh' }}
          multiple
        >
          {addresses.map((address, index) => (
            <option
              key={`ledger-connect-modal-address-${index}-${address}`}
              onClick={() => onSelectAddressIndex(index)}
            >
              {address}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectLedgerAddressStatus;
