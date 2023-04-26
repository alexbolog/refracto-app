import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SettingsButton } from './SettingsButton';

export const DeadlineSelectAndSettings = () => {
  return (
    <div>
      <button
        className='btn btn-primary dropdown-toggle dropdown deadline-select'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Select Deadline
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
      <SettingsButton />
    </div>
  );
};
