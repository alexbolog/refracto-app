import React from 'react';

const CurrencyPicker = () => {
  return (
    <div className='search-coundry'>
      <select className='form-control mt-3 mt-sm-0'>
        <option data-content='EUR'>EUR</option>
        <option data-content='USD'>USD</option>
      </select>
    </div>
  );
};

export default CurrencyPicker;
