import { ReactComponent as LedgerIcon } from './../../../../../assets/icons/refracto/ledger.svg';

const ConnectLedgerErrorStatus = ({
  errorMessage
}: {
  errorMessage?: string;
}) => {
  const errorMessageMapping: { [key: string]: string } = {
    "Failed to execute 'transferIn' on 'USBDevice': The transfer was cancelled.":
      'Please connect your ledger device, open the Elrond/MultiversX app and try again.',
    'Ledger device: UNKNOWN_ERROR (0x6e01)': 'Something went wrong',
    'Ledger device: Condition of use not satisfied (denied by the user?) (0x6985)':
      'Denied by the user'
  };
  return (
    <>
      <div className='col-12 d-flex justify-content-center mb-3'>
        <LedgerIcon
          style={{
            marginTop: '10px',
            maxWidth: '300px',
            marginRight: '100px'
          }}
        />
      </div>
      <div className='col-12 text-center'>
        <div className='mt-5 text-danger '>
          {errorMessageMapping[errorMessage ?? ''] ?? errorMessage}
        </div>
      </div>
    </>
  );
};

export default ConnectLedgerErrorStatus;
