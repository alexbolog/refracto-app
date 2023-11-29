import { Spinner } from 'react-bootstrap';

const ConnectLedgerStatus = () => {
  return (
    <div className='col-12 text-center'>
      <div className='mb-5'>Waiting for the device..</div>
      <Spinner animation='border' />
    </div>
  );
};

export default ConnectLedgerStatus;
