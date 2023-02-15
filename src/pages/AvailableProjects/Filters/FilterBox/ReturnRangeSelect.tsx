import React from 'react';

export const ReturnRangeSelect = () => {
  return (
    <div>
      <button
        className='btn btn-primary dropdown-toggle dropdown'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Select Return Range
      </button>
      <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
        <li>
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
        </li>
      </ul>
    </div>
  );
};
