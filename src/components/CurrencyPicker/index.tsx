import React from 'react';

const CurrencyPicker = () => {
  return (
    <div className='basic-form' style={{ marginRight: '20px' }}>
      <form>
        <div className='mb-0'>
          <select
            className='default-select  form-control wide'
            // className='btn dropdown-toggle btn-light dropdown-toggle'
            style={{ height: '100%', background: 'white' }}
          >
            <option>EUR</option>
            <option>USD</option>
            <option>RON</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default CurrencyPicker;
