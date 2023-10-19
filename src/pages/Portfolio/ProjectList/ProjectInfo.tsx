import React from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';
import { RiskBox } from 'components/RiskBox';
import { toLocaleStringOptions } from 'config';
import { routeNames } from 'routes';
import { Investment } from 'types/accountTypes';
import { formatIso } from 'utils';

const ProjectInfo = ({
  investmentData,
  hasBorder
}: {
  hasBorder: boolean;
  investmentData: Investment;
}) => {
  const navigate = useNavigate();

  const handleNavigateToProjectDetails = () => {
    navigate(
      `${routeNames.projectPage.replace(
        ':id',
        investmentData.projectInfo.projectId.toString()
      )}`
    );
  };

  return (
    <div className={`row ${hasBorder ? 'border-bottom' : ''}`}>
      <div className='col-lg-1 d-flex align-items-center'>
        <img
          src={investmentData.projectInfo.thumbnailSrc}
          className='thumb'
          alt='projectThumbnail'
        />
      </div>
      <div className='col-lg-11 mb-3'>
        <div className='container-fluid w-100'>
          <div className='row mb-2'>
            <div className='col-12 d-flex align-items-center'>
              <div
                className='square'
                style={{
                  backgroundColor: `#${investmentData.projectInfo.colorCodeHex}`
                }}
              ></div>
              <span className='ml-2'>
                <strong>{investmentData.projectInfo.projectTitle}</strong>
              </span>
            </div>
          </div>
          <div className='row d-flex justify-content-between align-items-center flex-column flex-sm-row'>
            <div className='col mb-1'>
              Invested{' '}
              <strong>
                €
                {investmentData.balance.toLocaleString(
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
                  investmentData.projectInfo.returnPercentage *
                  investmentData.balance
                ).toLocaleString(undefined, toLocaleStringOptions)}
              </strong>
            </div>
            <div className='col mb-1'>
              Deadline{' '}
              <strong>
                {formatIso(
                  investmentData.projectInfo.crowdfundingDeadline,
                  DateTime.DATE_SHORT
                )}
              </strong>
            </div>
            <div className='col mb-1'>
              Risk Rating{' '}
              <RiskBox riskLevel={investmentData.projectInfo.riskRatingLevel} />
            </div>
            <div className='col mb-1'>
              <button
                className='btn btn-primary view-proj-btn mb-1'
                onClick={handleNavigateToProjectDetails}
              >
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
