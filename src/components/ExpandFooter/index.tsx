import { ReactComponent as ExpandIcon } from '../../assets/icons/refracto/arrow_right_alt.svg';
import * as React from 'react';

const ExpandFooter = () => {
  return (
    <div
      className='card-footer d-flex justify-content-end'
      style={{ padding: '0', margin: '0', borderTop: '0' }}
    >
      <p
        className='text-primary'
        style={{ padding: '15px', marginRight: '10px', cursor: 'pointer' }}
      >
        Expand <ExpandIcon />
      </p>
    </div>
  );
};

export default ExpandFooter;
