import MultiRangeSlider from 'components/MultiRangeSlider';
import React, { useEffect, useState } from 'react';

export const ReturnRangeSelect = ({
  min,
  max,
  onChange
}: {
  min?: number;
  max?: number;
  onChange: (min: number, max: number) => void;
}) => {
  return (
    <div className='return-range-select'>
      <button
        className='btn btn-primary dropdown-toggle dropdown'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Select Return Range
      </button>
      <div
        className='dropdown-menu'
        aria-labelledby='dropdownMenuButton1'
        style={{
          padding: '0',
          background: '#fff'
        }}
      >
        <div className='p-3'>
          <MultiRangeSlider
            min={min ?? 0}
            max={max ?? 100}
            onChange={onChange}
          />
        </div>
        {/* <li>
          <a className='dropdown-item' href='#'>
            Action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            Another action
          </a>
        </li>
        <li>
          <a className='dropdown-item' href='#'>
            Something else here
          </a>
        </li> */}
      </div>
    </div>
  );
};
