import React from 'react';

import './sidebar.scss';

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
              <input type='checkbox' name='toggle-btn' value='Income' />
              <label htmlFor='checkbox3' className='check'></label>
            </div>
            <div>
              <span className='fs-14'>Income</span>
              <h4 className='fs-15 font-w600 mb-0'>1.982</h4>
            </div>
          </div>
          <div className='toggle-btn expense'>
            <div>
              <input type='checkbox' name='toggle-btn' value='Expense' />
              <label htmlFor='checkbox2' className='check'></label>
            </div>
            <div>
              <span className='fs-14'>Expense</span>
              <h4 className='fs-15 font-w600 mb-0'>1.982</h4>
            </div>
          </div>
        </div>
        <div className='card expense investment mb-3'>
          <div className='card-body p-3'>
            <div className='students1 d-flex align-items-center justify-content-between '>
              <div className='content'>
                <span>Income</span>
                <h2>$ 12,890,00</h2>
                <h5 className='up'>
                  <span className='text-white'>
                    <svg
                      width='24'
                      height='23'
                      viewBox='0 0 24 23'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M23.25 11.5C23.25 5.275 18.225 0.25 12 0.25C5.775 0.249999 0.75 5.275 0.75 11.5C0.749999 17.725 5.775 22.75 12 22.75C18.225 22.75 23.25 17.725 23.25 11.5ZM11.25 16.075L11.25 9.175L9.3 10.9C8.85 11.275 8.25 11.2 7.875 10.825C7.725 10.6 7.65 10.375 7.65 10.15C7.65 9.85 7.8 9.55 8.025 9.4L11.625 6.25C11.7 6.175 11.775 6.175 11.85 6.1C11.925 6.1 11.925 6.1 12 6.025C12.075 6.025 12.075 6.025 12.15 6.025L12.225 6.025C12.3 6.025 12.3 6.025 12.375 6.025L12.45 6.025C12.525 6.025 12.525 6.025 12.6 6.1C12.6 6.1 12.675 6.1 12.675 6.175L12.75 6.25C12.75 6.25 12.75 6.25 12.825 6.325L15.975 9.55C16.35 9.925 16.35 10.6 15.975 10.975C15.6 11.35 14.925 11.35 14.55 10.975L13.125 9.475L13.125 16.15C13.125 16.675 12.675 17.2 12.075 17.2C11.7 17.05 11.25 16.6 11.25 16.075Z'
                        fill='#FFFFFF'
                      />
                    </svg>
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
                <span>Expense</span>
                <h2>$12,890,00</h2>
                <h5 style={{ color: '#FFFFFF' }}>
                  <span className='text-white'>
                    <svg
                      width='24'
                      height='23'
                      viewBox='0 0 24 23'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M0.75 11.5C0.75 17.725 5.775 22.75 12 22.75C18.225 22.75 23.25 17.725 23.25 11.5C23.25 5.275 18.225 0.25 12 0.25C5.775 0.25 0.75 5.275 0.75 11.5ZM12.75 6.925L12.75 13.825L14.7 12.1C15.15 11.725 15.75 11.8 16.125 12.175C16.275 12.4 16.35 12.625 16.35 12.85C16.35 13.15 16.2 13.45 15.975 13.6L12.375 16.75C12.3 16.825 12.225 16.825 12.15 16.9C12.075 16.9 12.075 16.9 12 16.975C11.925 16.975 11.925 16.975 11.85 16.975L11.775 16.975C11.7 16.975 11.7 16.975 11.625 16.975L11.55 16.975C11.475 16.975 11.475 16.975 11.4 16.9C11.4 16.9 11.325 16.9 11.325 16.825L11.25 16.75C11.25 16.75 11.25 16.75 11.175 16.675L8.025 13.45C7.65 13.075 7.65 12.4 8.025 12.025C8.4 11.65 9.075 11.65 9.45 12.025L10.875 13.525L10.875 6.85C10.875 6.325 11.325 5.8 11.925 5.8C12.3 5.95 12.75 6.4 12.75 6.925Z'
                        fill='#FFFFFF'
                      />
                    </svg>
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
