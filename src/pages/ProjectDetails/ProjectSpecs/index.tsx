import {
  faArrowTrendUp,
  faCalendar,
  faFileInvoice,
  faFileInvoiceDollar,
  faFlag,
  faHourglassEmpty,
  faLineChart,
  faPiggyBank
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toLocaleStringOptions, toLocaleStringOptionsNoDecimals } from 'config';
import { DateTime } from 'luxon';
import { CFProgressBar } from 'pages/AvailableProjects/Project/CFProgressBar';
import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectPageDetails, FullProjectPageDetails } from 'types/projectTypes';
import { formatIso, formatRelativeDate, fromIso } from 'utils';
import { SpecRow } from './SpecRow';
import './style.css';

export const ProjectSpecs = ({
  project
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
}) => {
  const riskLevelBox = (value: string) => {
    const isLowRisk = value.includes('Low');
    const isMedRisk = value.includes('Med');
    if (isLowRisk) {
      return (
        <span className='risk-box risk-box-sm risk-low mb-1'>{value}</span>
      );
    }
    if (isMedRisk) {
      return (
        <span className='risk-box risk-box-sm risk-medium mb-1'>{value}</span>
      );
    }

    return <span className='risk-box risk-box-sm risk-high mb-1'>{value}</span>;
  };

  const components = [
    {
      icon: faHourglassEmpty,
      leftSideComponent: <span>Deadline</span>,
      rightSideComponent: (
        <span>
          {formatIso(project.crowdfundingDeadline, DateTime.DATE_SHORT)}
        </span>
      )
    }
  ];
  return (
    <div className='proj-specs-container'>
      <div className='project-specs-wrapper'>
        <div className='card w-100'>
          <div className='card-header b-0'>
            <h1>Project details</h1>
          </div>
          <div className='card-body p-0'>
            {components.map((c, idx) => (
              <SpecRow
                key={`project-details-specs-idx_${idx}`}
                icon={c.icon}
                leftSideComponent={c.leftSideComponent}
                rightSideComponent={c.rightSideComponent}
              />
            ))}
          </div>
          <div className='card-footer'>
            <button className='btn btn-primary btn-invest'>Invest</button>
          </div>
        </div>
      </div>
    </div>
  );
};
