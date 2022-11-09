import React from 'react';

const CurrencyPicker = () => {
  return (
    <div className='search-coundry'>
      <select className='form-control mt-3 mt-sm-0'>
        <option data-content='EUR'>EUR</option>
        <option data-content="<img src='images/svg/algeria.svg'/> Ripple">
          USD
        </option>
        <option
          data-thumbnail='images/svg/usflag.svg'
          data-content="<img src='images/svg/usflag.svg'/> Ethereum"
        >
          Austria
        </option>
        <option
          data-thumbnail='images/svg/rus.svg'
          data-content="<img src='images/svg/rus.svg'/> Bitcoin"
        >
          Belarus
        </option>
      </select>
    </div>
  );
};

export default CurrencyPicker;
