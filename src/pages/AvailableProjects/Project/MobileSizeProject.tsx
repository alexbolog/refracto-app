import React, { useContext } from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectInfo } from './ProjectInfo';
import './style.css';
import { ReactComponent as FavoriteDisabled } from './../../../assets/icons/refracto/favorite-empty.svg';
import { ReactComponent as FavoriteEnabled } from './../../../assets/icons/refracto/favorite-fill.svg';
import { CFProgressBar } from './CFProgressBar';
import { useNavigate } from 'react-router-dom';
import { routeNames } from 'routes';
import { AccountContext } from 'contexts/AccountContext';
import {
  createFavoriteProject,
  deleteFavoriteProject
} from 'db/favoriteProjects';

export const MobileSizeProject = ({
  project,
  isFavoriteEnabled,
  toggleFavorite
}: {
  project: ProjectListItem;
  isFavoriteEnabled: boolean;
  toggleFavorite: () => void;
}) => {
  const navigate = useNavigate();
  const handleShowProjectDetails = () => {
    navigate(
      `${routeNames.projectPage.replace(':id', project.projectId.toString())}`
    );
  };

  return (
    <div className='card project-wrapper mobile-size'>
      <div className='card-header p-0 border-0'>
        <img src={project.thumbnailSrc} />
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
      </div>
      <div className='card-body container-fluid p-0'>
        <div className='row w-100' style={{ padding: '0 20px' }}>
          <div className='col-12 w-100 ml-1'>
            <h1 className='project-title'>{project.projectTitle}</h1>
          </div>
          <div className='col-12 w-100 p-0'>
            <ProjectInfo project={project} />
          </div>
        </div>
      </div>
      <div className='card-footer border-0'>
        <button
          className='btn btn-primary btn-details'
          onClick={handleShowProjectDetails}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
