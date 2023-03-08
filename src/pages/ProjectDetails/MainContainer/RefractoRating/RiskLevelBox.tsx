import React from 'react';

export const RiskLevelBox = ({ riskLevel }: { riskLevel: string }) => {
  return (
    <div className='w-100 rating-box'>
      <div
        className={`rating low ${riskLevel.includes('Low') ? 'active' : ''}`}
      >
        Low Risk
      </div>
      <div
        className={`rating med ${riskLevel.includes('Med') ? 'active' : ''}`}
      >
        Medium Risk
      </div>
      <div
        className={`rating high ${riskLevel.includes('High') ? 'active' : ''}`}
      >
        High Risk
      </div>
    </div>
  );
};
