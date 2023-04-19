import React from 'react';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SettingsButton = () => {
  return (
    <button
      className='btn btn-outline-primary ml-2 btn-md'
      id='filter-box-settings-btn'
    >
      <FontAwesomeIcon icon={faSlidersH} />
    </button>
  );
};
