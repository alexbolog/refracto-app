import React from 'react';
import { toLocaleStringOptions } from 'config';
import { DateTime } from 'luxon';
import { ActiveProjectInvestment } from 'types/projectTypes';
import { formatIso } from 'utils';

const ProjectInfo = ({
  projectData,
  hasBorder
}: {
  hasBorder: boolean;
  projectData: ActiveProjectInvestment;
}) => {
  const riskLevelBox = (riskLevel: string) => {
    const isLowRisk = riskLevel.includes('Low');
    const isMedRisk = riskLevel.includes('Med');
    if (isLowRisk) {
      return <span className='risk-box risk-low mb-1'>{riskLevel}</span>;
    }
    if (isMedRisk) {
      return <span className='risk-box risk-medium mb-1'>{riskLevel}</span>;
    }

    return <span className='risk-box risk-high mb-1'>{riskLevel}</span>;
  };
  return (
    <div className={`row ${hasBorder ? 'border-bottom' : ''}`}>
      <div className='col-lg-1 d-flex align-items-center'>
        <img src={projectData.thumbnailSrc} className='thumb' />
      </div>
      <div className='col-lg-11 mb-3'>
        <div className='container-fluid w-100'>
          <div className='row'>
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
            <div className='col-12 d-flex justify-content-between align-items-center'>
              <span>
                Invested{' '}
                <strong>
                  €
                  {projectData.amountInvested.toLocaleString(
                    undefined,
                    toLocaleStringOptions
                  )}
                </strong>
              </span>
              <span>
                Return of investment{' '}
                <strong>
                  €
                  {(
                    projectData.returnPercentage * projectData.amountInvested
                  ).toLocaleString(undefined, toLocaleStringOptions)}
                </strong>
              </span>
              <span>
                Deadline{' '}
                <strong>
                  {formatIso(
                    projectData.crowdfundingDeadline,
                    DateTime.DATE_SHORT
                  )}
                </strong>
              </span>
              {riskLevelBox(projectData.riskRatingLevel)}
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
