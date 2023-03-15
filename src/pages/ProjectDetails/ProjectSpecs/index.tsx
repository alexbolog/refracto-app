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
import { routeNames } from 'routes';
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
    },
    {
      icon: faFileInvoice,
      leftSideComponent: <span>Asset Class</span>,
      rightSideComponent: <span>{project.assetClass}</span>
    },
    {
      icon: faPiggyBank,
      leftSideComponent: <span>Investment Type</span>,
      rightSideComponent: <span>{project.investmentType}</span>
    },
    {
      icon: faArrowTrendUp,
      leftSideComponent: <span>Rating</span>,
      rightSideComponent: <span>{riskLevelBox(project.riskRatingLevel)}</span>
    },
    {
      icon: faCalendar,
      leftSideComponent: <span>Loan Duration</span>,
      rightSideComponent: (
        <span>{formatRelativeDate(fromIso(project.loanDeadline))}</span>
      )
    },
    {
      icon: faFileInvoiceDollar,
      leftSideComponent: <span>Rate of return</span>,
      rightSideComponent: (
        <span>
          {(project.returnPercentage * 100).toLocaleString(
            undefined,
            toLocaleStringOptions
          )}
        </span>
      )
    },
    {
      icon: faFileInvoiceDollar,
      leftSideComponent: <span>No. of investors</span>,
      rightSideComponent: <span>{project.totalParticipantsCount}</span>
    },
    {
      icon: faFlag,
      leftSideComponent: <span>Goal</span>,
      rightSideComponent: (
        <span>
          €
          {project.crowdfundingTarget.toLocaleString(
            undefined,
            toLocaleStringOptionsNoDecimals
          )}
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
          <div className='card-body project-specs-list'>
            {components.map((c, idx) => (
              <SpecRow
                key={`project-details-specs-idx_${idx}`}
                icon={c.icon}
                leftSideComponent={c.leftSideComponent}
                rightSideComponent={c.rightSideComponent}
              />
            ))}
            <CFProgressBar
              className='proj-specs-progress-bar'
              crowdfundedAmount={project.crowdfundedAmount}
              crowdfundingTarget={project.crowdfundingTarget}
              deadline={project.crowdfundingDeadline}
            />
            <SpecRow
              leftSideComponent={<span>Project Developer</span>}
              rightSideComponent={
                <span style={{ color: '#364E63' }}>
                  {project.projectDeveloperName}
                </span>
              }
            />
            <SpecRow
              leftSideComponent={<span>Final Interest Rate</span>}
              rightSideComponent={
                <span style={{ color: '#364E63' }}>
                  {(project.returnPercentage * 100).toLocaleString(
                    undefined,
                    toLocaleStringOptions
                  )}
                  %
                </span>
              }
            />
            <SpecRow
              leftSideComponent={<span>Returned to Investors</span>}
              rightSideComponent={
                <span style={{ color: '#364E63' }}>
                  €
                  {project.amountReturnedSoFar.toLocaleString(
                    undefined,
                    toLocaleStringOptions
                  )}
                </span>
              }
            />
          </div>
          <div className='card-footer'>
            <Link
              to={`${routeNames.invest.replace(':id', project.projectId)}`}
              className='btn btn-primary btn-invest'
            >
              Invest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
