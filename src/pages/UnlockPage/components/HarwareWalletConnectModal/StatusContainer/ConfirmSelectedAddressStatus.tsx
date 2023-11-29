import { AccountContext } from 'contexts/AccountContext';
import { useContext } from 'react';
import { ReactComponent as LedgerIcon } from './../../../../../assets/icons/refracto/ledger.svg';

const ConfirmSelectedAddressStatus = ({
  selectedAddress
}: {
  selectedAddress: string;
}) => {
  const { authToken } = useContext(AccountContext);
  return (
    <>
      <div className='col-12 text-center mb-5 mt-4'>
        Check your Ledger device. <br />
        Confirm that both the address and the authorization token match the
        values displayed on your device.
      </div>
      <div className='col-12 d-flex justify-content-center mb-3'>
        <LedgerIcon
          style={{
            marginTop: '10px',
            maxWidth: '300px',
            marginRight: '100px'
          }}
        />
      </div>
      <div className='col-12'>
        <div className='ledger-modal address-box'>
          <span>Selected Address:</span>
          <span className='value'>{selectedAddress}</span>
        </div>
        <div className='ledger-modal address-box'>
          <span>Authorization token:</span>
          <span className='value'>
            {authToken}
            {'{}'}
          </span>
        </div>
      </div>
    </>
  );
};

export default ConfirmSelectedAddressStatus;
