import { AVAILABLE_CURRENCIES } from 'enums';
import React, { useEffect, useState } from 'react';

const CurrencyPicker = () => {
  const [selectedCurrency, setSelectedCurrency] =
    useState<AVAILABLE_CURRENCIES>(AVAILABLE_CURRENCIES.EUR);
  useEffect(() => {
    console.log(Object.keys(AVAILABLE_CURRENCIES));
  }, []);
  return (
    <div className='basic-dropdown'>
      <div className='dropdown'>
        <button
          type='button'
          className='btn btn-white dropdown-toggle'
          data-bs-toggle='dropdown'
          style={{ marginRight: '20px' }}
        >
          {AVAILABLE_CURRENCIES[selectedCurrency]}
        </button>
        <div className='dropdown-menu'>
          {Object.keys(AVAILABLE_CURRENCIES)
            .filter((key) => !isNaN(Number(key)))
            .map((key: string, idx) => (
              <button
                className='dropdown-item'
                key={`currency-selector-btn-${idx}`}
                onClick={() => setSelectedCurrency(parseInt(key))}
              >
                {AVAILABLE_CURRENCIES[parseInt(key)]}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyPicker;
