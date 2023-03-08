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
    <div className='rating-table-wrapper'>
      <div className='rating-table-row'>
        <div className='category t-header'>Category</div>
        <div className='assesments t-header'>Assesments</div>
      </div>
      {ratings.map((r, idx) => (
        <div className='rating-table-row' key={`refracto-rating-key-${idx}`}>
          <div className='category'>{r.category}</div>
          <div className='assesments'>{r.assesments}</div>
        </div>
      ))}
      <div className='rating-table-row'>
        <div className='category' style={{ fontWeight: 700 }}>
          Total
        </div>
        <div className='assesments'>{riskLevelBox(riskLevel)}</div>
      </div>
    </div>
  );
};
