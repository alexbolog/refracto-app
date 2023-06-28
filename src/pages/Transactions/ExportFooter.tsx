import React from 'react';

export const ExportFooter = () => {
  return (
    <div className='card'>
      <div className='card-body footer-wrapper'>
        {/* <div className='d-flex justify-content-start'>
          <div>
            <strong>Total ROI:</strong> 800 EUR
          </div>
          <div className='ml-3'>
            <strong>Investment:</strong> 500 EUR
          </div>
        </div>
        <div>
          <button className='btn btn-outline-primary btn-export'>
            Export CSV
          </button>
          <button className='btn btn-primary btn-export ml-3'>Export PDF</button>
        </div> */}
        <div className='col-stats'>
          <div>
            <strong>Total ROI:</strong> 800 EUR
          </div>
          <div>
            <strong>Investment:</strong> 500 EUR
          </div>
        </div>
        <div className='col-actions'>
          <button className='btn btn-outline-primary btn-export'>
            Export CSV
          </button>
          <button className='btn btn-primary btn-export'>Export PDF</button>
        </div>
      </div>
    </div>
  );
};
