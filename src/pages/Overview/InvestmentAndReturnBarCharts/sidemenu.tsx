import React from 'react';

import './sidemenu.scss';
import upArrowIcon from './upArrowIcon';
import { toLocaleStringOptions } from '../../../config';

const SideMenu = ({
  toggleSeriesHandler,
  investedTotal,
  roiTotal
}: {
  toggleSeriesHandler: (seriesName: string) => void;
  investedTotal: number;
  roiTotal: number;
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
            <div className='pl-2 d-flex align-items-center justify-content-between '>
              <div className='content'>
                <span>Invested</span>
                <h2>
                  €
                  {investedTotal.toLocaleString(
                    undefined,
                    toLocaleStringOptions
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className='card expense roi mb-3 '>
          <div className='card-body p-3 '>
            <div className='pl-2 d-flex align-items-center justify-content-between '>
              <div className='content'>
                <span>Return on Investment</span>
                <h2>
                  €{roiTotal.toLocaleString(undefined, toLocaleStringOptions)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
