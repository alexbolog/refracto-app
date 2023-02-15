import {
  faMagnifyingGlass,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from 'components/SearchBar';
import React from 'react';
import { DeadlineSelectAndSettings } from './DeadlineSelectAndSettings';
import { ProjectListFilterType } from './ProjectListFilterType';
import { RatingSelect } from './RatingSelect';
import { ReturnRangeSelect } from './ReturnRangeSelect';
import './style.css';

export const FilterBox = ({}: {
  onApplyFilters: (selectedFilters: ProjectListFilterType) => void;
}) => {
  return (
    <div className='card w-100'>
      <div className='card-body border-0'>
        <div className='container-fluid p-0'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='input-group search-bar-container'>
                <span className='input-group-text search-icon'>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className='text-primary'
                  />
                </span>
                <input
                  type='text'
                  className='form-control h-100 search-bar-input'
                  placeholder='Search for a project'
                />
              </div>
            </div>
            <div
              className='col-lg-6 d-flex justify-content-end'
              style={{ gap: '10px' }}
            >
              <ReturnRangeSelect />
              <RatingSelect />
              <DeadlineSelectAndSettings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
