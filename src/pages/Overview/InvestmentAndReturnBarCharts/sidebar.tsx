import React from 'react';

import './sidebar.scss';
import upArrowIcon from './upArrowIcon';

const Sidebar = ({
  toggleSeriesHandler
}: {
  toggleSeriesHandler: (seriesName: string) => void;
}) => {
  const investedCheckboxRef = React.useRef<any>(null);
  const roiCheckboxRef = React.useRef<any>(null);

  return (
    <div className='col-3'>
      <div className='statistic-content' style={{ padding: 0 }}>
        <div className='statistic-toggle my-3 text-legend'>
          <div
            className='toggle-btn'
            onClick={() => {
              toggleSeriesHandler('Invested');
              investedCheckboxRef.current.checked =
                !investedCheckboxRef.current.checked;
            }}
          >
            <div>
              <input
                ref={investedCheckboxRef}
                type='checkbox'
                name='toggle-btn'
                className='legend-checkbox'
              />
              <label htmlFor='checkbox3' className='check'></label>
            </div>
            <div>
              <span className='fs-14'>Invested</span>
            </div>
          </div>
          <div
            className='toggle-btn expense'
            onClick={() => {
              toggleSeriesHandler('Return on Investment');
              roiCheckboxRef.current.checked = !roiCheckboxRef.current.checked;
            }}
          >
            <div>
              <input
                ref={roiCheckboxRef}
                type='checkbox'
                name='toggle-btn'
                className='legend-checkbox'
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
                <span>Invested</span>
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
