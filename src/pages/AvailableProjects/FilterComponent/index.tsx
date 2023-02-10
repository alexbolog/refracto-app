import {
  faMagnifyingGlass,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBar from 'components/SearchBar';
import React from 'react';
import { ProjectListFilterType } from './ProjectListFilterType';
import './style.css';

export const FilterComponent = ({}: {
  onApplyFilters: (selectedFilters: ProjectListFilterType) => void;
}) => {
  return (
    <div className='card w-100'>
      <div className='card-body border-0'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='input-group mb-3 search-bar-container'>
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
              <div>
                <button
                  className='btn btn-primary dropdown-toggle dropdown'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Select return range
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
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
              <div>
                <button
                  className='btn btn-primary dropdown-toggle dropdown'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Select Rating
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
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
              <div>
                <button
                  className='btn btn-primary dropdown-toggle dropdown'
                  type='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Select Deadline
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
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
              <div className='btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon icon={faSlidersH} size='1x' />
              </div>
            </div>
          </div>
        </div>
        {/* <div className='w-50'>
          
        </div> */}
      </div>
    </div>
  );
};
