import { toLocaleStringOptions } from 'config';
import React from 'react';
import { SuggestedProject } from 'types/accountTypes';
import { ReactComponent as FavoriteDisabled } from './../../assets/icons/refracto/favorite-empty.svg';
import { ReactComponent as FavoriteEnabled } from './../../assets/icons/refracto/favorite-fill.svg';
import { formatIso } from '../../utils';
import { DateTime } from 'luxon';

const ProjectCardItem = ({
  projectDetails,
  onToggleFavorite,
  isButtonOutline,
  buttonText,
  className
}: {
  className?: string;
  projectDetails: SuggestedProject;
  onToggleFavorite: (projectId: string, state: boolean) => void;
  isButtonOutline: boolean;
  buttonText: string;
}) => {
  const [isFavoriteEnabled, setIsFavoriteEnabled] = React.useState(
    projectDetails.isFavorite
  );
  const toggleFavorite = () => {
    onToggleFavorite(projectDetails.projectId, !isFavoriteEnabled);
    setIsFavoriteEnabled(!isFavoriteEnabled);
  };

  return (
    <div className={className}>
      <div className='card w-100'>
        <div
          className='card-header row d-flex align-items-start'
          style={{ border: 'none' }}
        >
          <div className='col-lg-3 text-left'>
            <img
              src={projectDetails.thumbnailSrc}
              height='60px'
              width='60px'
              className='rounded'
            />
          </div>
          <div className='col-lg-6 text-left'>
            <h6>
              <strong>{projectDetails.projectTitle}</strong>
            </h6>
          </div>
          <div className='col-lg-3 text-right'>
            <button
              style={{
                background: 'white',
                borderRadius: '0.625rem',
                border: '1px #D5DFE7 solid',
                padding: '0.5rem'
              }}
            >
              {isFavoriteEnabled && (
                <FavoriteEnabled
                  height={16}
                  width={16.8}
                  onClick={toggleFavorite}
                />
              )}
              {!isFavoriteEnabled && (
                <FavoriteDisabled
                  height={16}
                  width={16.8}
                  onClick={toggleFavorite}
                />
              )}
            </button>
          </div>
        </div>
        <div className='card-body row'>
          <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-between'>
            <h5>Return</h5>
            <h5>
              <strong>
                {(projectDetails.returnPercentage * 100).toLocaleString(
                  undefined,
                  toLocaleStringOptions
                )}
                %
              </strong>
            </h5>
          </div>
          <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-between'>
            <h5>Crowdfunding Deadline</h5>
            <h5>
              <strong>
                {formatIso(
                  projectDetails.crowdfundingDeadline,
                  DateTime.DATE_MED
                )}
              </strong>
            </h5>
          </div>
        </div>
        <div className='card-footer row' style={{ border: 'none' }}>
          <div className='col-lg-12 col-sm-12 col-md-12'>
            <button
              className={`w-100 btn ${
                isButtonOutline ? 'btn-outline-primary' : 'btn-primary'
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardItem;
