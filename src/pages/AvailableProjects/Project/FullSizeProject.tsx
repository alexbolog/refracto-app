import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectInfo } from './ProjectInfo';
import './style.css';
import { ReactComponent as FavoriteDisabled } from './../../../assets/icons/refracto/favorite-empty.svg';
import { ReactComponent as FavoriteEnabled } from './../../../assets/icons/refracto/favorite-fill.svg';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';

export const FullSizeProject = ({ project }: { project: ProjectListItem }) => {
  const [isFavoriteEnabled, setIsFavoriteEnabled] = React.useState(false);
  const toggleFavorite = () => {
    // onToggleFavorite(projectDetails.projectId, !isFavoriteEnabled);
    setIsFavoriteEnabled(!isFavoriteEnabled);
  };

  const navigate = useNavigate();
  const handleShowProjectDetails = () => {
    navigate(`${routeNames.projectPage.replace(':id', project.projectId)}`);
  };

  return (
    <div className='card project-wrapper'>
      <div className='card-body container-fluid pb-1'>
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
            <button
              className='btn btn-primary align-self-end btn-details'
              onClick={handleShowProjectDetails}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
