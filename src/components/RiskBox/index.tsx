import React, { useEffect, useState } from 'react';

export const RiskBox = ({
  riskLevel,
  size
}: {
  riskLevel: string;
  size?: 'sm' | 'lg';
}) => {
  enum RiskLevel {
    None,
    Low,
    Medium,
    High
  }
  const parseRiskLevel = () => {
    if (riskLevel.includes('Low')) return RiskLevel.Low;
    if (riskLevel.includes('Med')) return RiskLevel.Medium;
    if (riskLevel.includes('High')) return RiskLevel.High;
    return RiskLevel.None;
  };

  const [risk] = useState<RiskLevel>(parseRiskLevel());
  const riskBadgeStyling = () => {
    let css = 'badge badge-pill ';
    if (size === 'sm') {
      css += 'badge-sm ';
    }
    if (size === 'lg') {
      css += 'badge-lg ';
    }
    switch (risk) {
      case RiskLevel.None:
        css += 'badge-dark';
        break;
      case RiskLevel.Low:
        css += 'badge-success';
        break;
      case RiskLevel.Medium:
        css += 'badge-warning';
        break;
      case RiskLevel.High:
        css += 'badge-danger';
        break;
    }

    return css;
  };
  return <span className={riskBadgeStyling()}>{riskLevel}</span>;
};
