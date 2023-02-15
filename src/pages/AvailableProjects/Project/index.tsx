import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectInfo } from './ProjectInfo';
import './style.css';
import { ReactComponent as FavoriteDisabled } from './../../../assets/icons/refracto/favorite-empty.svg';
import { ReactComponent as FavoriteEnabled } from './../../../assets/icons/refracto/favorite-fill.svg';

export const Project = ({ project }: { project: ProjectListItem }) => {
  const [isFavoriteEnabled, setIsFavoriteEnabled] = React.useState(false);
  const toggleFavorite = () => {
    // onToggleFavorite(projectDetails.projectId, !isFavoriteEnabled);
    setIsFavoriteEnabled(!isFavoriteEnabled);
  };
  return (
    <div className='card project-wrapper'>
      <div className='card-body container-fluid'>
        <div className='row'>
          <div className='col-2'>
            <img src={project.thumbnailSrc} />
          </div>
          <div className='col-8'>
            <ProjectInfo project={project} />
          </div>
          <div className='col-2 d-grid'>
            <button className='btn btn-fav'>
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
            <button className='btn btn-primary align-self-end btn-details'>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
