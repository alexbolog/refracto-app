import React from 'react';

export const ExportFooter = ({
  totalRoi,
  totalInvestment
}: {
  totalRoi: number;
  totalInvestment: number;
}) => {
  return (
    <div className='card'>
      <div className='card-body footer-wrapper'>
        <div className='col-stats'>
          <div>
            <strong>Total ROI:</strong> {totalRoi.toLocaleString()} USD
          </div>
          <div>
            <strong>Investment:</strong> {totalInvestment.toLocaleString()} USD
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
