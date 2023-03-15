import React from 'react';
import { RefractoRatingItem } from 'types/projectTypes';

export const RatingTable = ({
  ratings,
  riskLevel
}: {
  ratings: RefractoRatingItem[];
  riskLevel: string;
}) => {
  const riskLevelBox = (value: string) => {
    const isLowRisk = value.includes('Low');
    const isMedRisk = value.includes('Med');
    if (isLowRisk) {
      return <span className='risk-box risk-low mb-1'>{value}</span>;
    }
    if (isMedRisk) {
      return <span className='risk-box risk-medium mb-1'>{value}</span>;
    }

    return <span className='risk-box risk-high mb-1'>{value}</span>;
  };

  return (
    <div className='table-responsive mt-4'>
      <table className='table table-responsive-sm'>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Category</th>
            <th>Assesments</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((row, idx) => (
            <tr key={`rating-table-entry_${idx}`}>
              <td>{row.category}</td>
              <td>{row.assesments}</td>
            </tr>
          ))}
          <tr className='last-row'>
            <td>Total</td>
            <td>{riskLevelBox(riskLevel)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
