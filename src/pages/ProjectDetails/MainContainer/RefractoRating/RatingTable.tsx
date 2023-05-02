import { RiskBox } from 'components/RiskBox';
import React from 'react';
import { RefractoRatingItem } from 'types/projectTypes';

export const RatingTable = ({
  ratings,
  riskLevel
}: {
  ratings: RefractoRatingItem[];
  riskLevel: string;
}) => {
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
            <td>
              <RiskBox riskLevel={riskLevel} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
