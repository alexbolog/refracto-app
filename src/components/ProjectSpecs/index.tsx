import React from 'react';
import {
  faArrowTrendUp,
  faCalendar,
  faFileInvoice,
  faFileInvoiceDollar,
  faFlag,
  faHourglassEmpty,
  faPersonArrowUpFromLine,
  faPiggyBank
} from '@fortawesome/free-solid-svg-icons';
import { RiskBox } from 'components/RiskBox';
import { toLocaleStringOptions, toLocaleStringOptionsNoDecimals } from 'config';
import { DateTime } from 'luxon';
import { CFProgressBar } from 'pages/AvailableProjects/Project/CFProgressBar';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { formatIso, fromIso } from 'utils';
import { SpecRow } from './SpecRow';
import './style.css';

export const ProjectSpecs = ({
  project,
  sm,
  sticky
}: {
  project: ProjectPageDetails | FullProjectPageDetails;
  sm?: boolean;
  sticky?: boolean;
}) => {
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
      rightSideComponent: (
        <span>
          <RiskBox riskLevel={project.riskRatingLevel} />
        </span>
      )
    },
    {
      icon: faCalendar,
      leftSideComponent: <span>Loan Duration</span>,
      rightSideComponent: (
        <span>
          {fromIso(project.loanDeadline)
            .diff(fromIso(project.crowdfundingDeadline))
            .rescale()
            .toHuman()}
        </span>
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
          %
        </span>
      )
    },
    {
      icon: faPersonArrowUpFromLine,
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
    <div className={`proj-specs-container ${!sticky ? 'not-sticky' : ''}`}>
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
            {!sm && (
              <>
                <SpecRow
                  leftSideComponent={<span>Project Developer</span>}
                  rightSideComponent={
                    <span className='proj-specs-value'>
                      {project.projectDeveloperName}
                    </span>
                  }
                />
                <SpecRow
                  leftSideComponent={<span>Final Interest Rate</span>}
                  rightSideComponent={
                    <span className='proj-specs-value'>
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
                    <span className='proj-specs-value'>
                      €
                      {project.amountReturnedSoFar.toLocaleString(
                        undefined,
                        toLocaleStringOptions
                      )}
                    </span>
                  }
                />
              </>
            )}
          </div>
          {!sm && (
            <div className='card-footer'>
              <Link
                to={`${routeNames.invest.replace(
                  ':id',
                  project.projectId.toString()
                )}`}
                className='btn btn-primary btn-invest'
              >
                Invest
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
