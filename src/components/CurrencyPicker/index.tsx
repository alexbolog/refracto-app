import { AccountContext } from 'contexts/AccountContext';
import { AVAILABLE_CURRENCIES } from 'enums';
import React, { useContext, useEffect, useState } from 'react';

const CurrencyPicker = () => {
  const context = useContext(AccountContext);
  const [selectedCurrency, setSelectedCurrency] =
    useState<AVAILABLE_CURRENCIES>(context.selectedCurrency);
  useEffect(() => {
    context.setSelectedCurrency(selectedCurrency);
  }, [selectedCurrency]);

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
