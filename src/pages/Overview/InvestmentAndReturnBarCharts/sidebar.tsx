import React from 'react';

import './sidebar.scss';
import upArrowIcon from './upArrowIcon';

const Sidebar = () => {
  return (
    <div className='col-3'>
      <div className='statistic-content' style={{ padding: 0 }}>
        <div className='d-flex justify-content-between'>
          <select
            className='image-select default-select dashboard-select primary-light'
            aria-label='Default'
          >
            <option selected>This Month</option>
            <option value='1'>This Weeks</option>
            <option value='2'>This Day</option>
          </select>
          <div className='dropdown custom-dropdown'>
            <div className='btn sharp primary-light' data-bs-toggle='dropdown'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                xlinkHref='http://www.w3.org/1999/xlink'
                width='18px'
                height='18px'
                viewBox='0 0 24 24'
                version='1.1'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <rect x='0' y='0' width='24' height='24'></rect>
                  <circle fill='#000000' cx='12' cy='5' r='2'></circle>
                  <circle fill='#000000' cx='12' cy='12' r='2'></circle>
                  <circle fill='#000000' cx='12' cy='19' r='2'></circle>
                </g>
              </svg>
            </div>
            <div className='dropdown-menu dropdown-menu-end'>
              <a className='dropdown-item' href='javascript:void(0);'>
                Option 1
              </a>
              <a className='dropdown-item' href='javascript:void(0);'>
                Option 2
              </a>
              <a className='dropdown-item' href='javascript:void(0);'>
                Option 3
              </a>
            </div>
          </div>
        </div>
        <div className='statistic-toggle my-3 text-legend'>
          <div className='toggle-btn'>
            <div>
              <input type='checkbox' name='toggle-btn' value='Investment' />
              <label htmlFor='checkbox3' className='check'></label>
            </div>
            <div>
              <span className='fs-14'>Investment</span>
            </div>
          </div>
          <div className='toggle-btn expense'>
            <div>
              <input
                type='checkbox'
                name='toggle-btn'
                value='Return on Investment'
              />
              <label htmlFor='checkbox2' className='check'></label>
            </div>
            <div>
              <span className='fs-14'>Return on Investment</span>
            </div>
          </div>
        </div>
        <div className='card expense investment mb-3'>
          <div className='card-body p-3'>
            <div className='students1 d-flex align-items-center justify-content-between '>
              <div className='content'>
                <span>Investment</span>
                <h2>$ 12,890,00</h2>
                <h5 className='up'>
                  <span className='text-white'>
                    {upArrowIcon()}
                    +15%
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className='card expense roi mb-3 '>
          <div className='card-body p-3 '>
            <div className='students1 d-flex align-items-center justify-content-between '>
              <div className='content'>
                <span>Return on Investment</span>
                <h2>$12,890,00</h2>
                <h5 className='up' style={{ color: '#FFFFFF' }}>
                  <span className='text-white'>
                    {upArrowIcon()}
                    +15%
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
