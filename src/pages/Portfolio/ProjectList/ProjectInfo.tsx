import React from 'react';
import { DateTime } from 'luxon';
import { RiskBox } from 'components/RiskBox';
import { toLocaleStringOptions } from 'config';
import { ActiveProjectInvestment } from 'types/projectTypes';
import { formatIso } from 'utils';

const ProjectInfo = ({
  projectData,
  hasBorder
}: {
  hasBorder: boolean;
  projectData: ActiveProjectInvestment;
}) => {
  return (
    <div className={`row ${hasBorder ? 'border-bottom' : ''}`}>
      <div className='col-lg-1 d-flex align-items-center'>
        <img src={projectData.thumbnailSrc} className='thumb' />
      </div>
      <div className='col-lg-11 mb-3'>
        <div className='container-fluid w-100'>
          <div className='row mb-2'>
            <div className='col-12 d-flex align-items-center'>
              <div
                className='square'
                style={{
                  backgroundColor: `#${projectData.colorCodeHex}`
                }}
              ></div>
              <span className='ml-2'>
                <strong>{projectData.projectTitle}</strong>
              </span>
            </div>
          </div>
          <div className='row d-flex justify-content-between align-items-center flex-column flex-sm-row'>
            <div className='col mb-1'>
              Invested{' '}
              <strong>
                €
                {projectData.amountInvested.toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
              </strong>
            </div>
            <div className='col mb-1'>
              Return of investment{' '}
              <strong>
                €
                {(
                  projectData.returnPercentage * projectData.amountInvested
                ).toLocaleString(undefined, toLocaleStringOptions)}
              </strong>
            </div>
            <div className='col mb-1'>
              Deadline{' '}
              <strong>
                {formatIso(
                  projectData.crowdfundingDeadline,
                  DateTime.DATE_SHORT
                )}
              </strong>
            </div>
            <div className='col mb-1'>
              <RiskBox riskLevel={projectData.riskRatingLevel} />
            </div>
            <div className='col mb-1'>
              <button className='btn btn-primary view-proj-btn mb-1'>
                View project details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
