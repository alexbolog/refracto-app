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
import { formatIso, getLargestUnitTimeUntil } from 'utils';

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
  return (
    <div className='card project-specs-wrapper position-fixed'>
      <div className='card-header b-0'>
        <h1>Project details</h1>
      </div>
      <div className='card-body p-0 project-specs-container'>
        <div className='container-fluid'>
          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faHourglassEmpty}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Deadline</span>
            </div>
            <div className='col-6 text-end p-0 spec-value'>
              <span>
                {formatIso(project.crowdfundingDeadline, DateTime.DATE_SHORT)}
              </span>
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faFileInvoice}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Asset Class</span>
            </div>
            <div className='col-6 text-end p-0 spec-value'>
              <span>{project.assetClass}</span>
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faPiggyBank}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Investment Type</span>
            </div>
            <div className='col-6 text-end p-0 spec-value'>
              <span>{project.investmentType}</span>
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Rating</span>
            </div>
            <div className='col-6 d-flex justify-content-end p-0 spec-value'>
              {riskLevelBox(project.riskRatingLevel)}
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faCalendar}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Loan Duration</span>
            </div>
            <div className='col-6 d-flex justify-content-end p-0 spec-value'>
              {getLargestUnitTimeUntil(project.loanDeadline)}
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Rate of return</span>
            </div>
            <div className='col-6 d-flex justify-content-end p-0 spec-value'>
              {(project.returnPercentage * 100).toLocaleString(
                undefined,
                toLocaleStringOptions
              )}
              %
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faFileInvoiceDollar}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>No. of investors</span>
            </div>
            <div className='col-6 d-flex justify-content-end p-0 spec-value'>
              {project.totalParticipantsCount}
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-1 text-center'>
              <FontAwesomeIcon
                icon={faFlag}
                className='text-primary spec-icon'
              />
            </div>
            <div className='col-5 text-start spec-type'>
              <span>Goal</span>
            </div>
            <div className='col-6 d-flex justify-content-end p-0 spec-value'>
              €
              {project.crowdfundingTarget.toLocaleString(
                undefined,
                toLocaleStringOptionsNoDecimals
              )}
            </div>
          </div>

          <div className='row w-100'>
            <div className='col-12 p-0 ml-2'>
              <CFProgressBar
                crowdfundedAmount={project.crowdfundedAmount}
                crowdfundingTarget={project.crowdfundingTarget}
                deadline={project.crowdfundingDeadline}
              />
            </div>
          </div>

          <div className='row w-100' style={{ marginTop: '30px' }}>
            <div className='col-6 text-start spec-type'>
              <span>Project Developer</span>
            </div>
            <div className='col-6 text-end spec-value'>
              <span>
                <Link to='#'>{project.projectDeveloperName}</Link>
              </span>
            </div>
          </div>

          <div className='row w-100' style={{ marginTop: '12px' }}>
            <div className='col-6 text-start spec-type'>
              <span>Final Interest Rate</span>
            </div>
            <div className='col-6 text-end spec-value'>
              <span>
                {(project.returnPercentage * 100).toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
                %
              </span>
            </div>
          </div>
          <div className='row w-100' style={{ marginTop: '12px' }}>
            <div className='col-6 text-start spec-type'>
              <span>Returned to Investors</span>
            </div>
            <div className='col-6 text-end spec-value'>
              <span>
                €
                {project.amountReturnedSoFar.toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='card-footer'>
        <button className='btn btn-primary btn-invest'>Invest</button>
      </div>
    </div>
  );
};
