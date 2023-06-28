import React from 'react';
import { ProjectListItem } from 'types/projectTypes';
import { ProjectInfo } from './ProjectInfo';
import './style.css';
import { ReactComponent as FavoriteDisabled } from './../../../assets/icons/refracto/favorite-empty.svg';
import { ReactComponent as FavoriteEnabled } from './../../../assets/icons/refracto/favorite-fill.svg';
import { FullSizeProject } from './FullSizeProject';
import { MobileSizeProject } from './MobileSizeProject';

export const Project = ({ project }: { project: ProjectListItem }) => {
  const [isFavoriteEnabled, setIsFavoriteEnabled] = React.useState(false);

  const toggleFavorite = () => {
    // onToggleFavorite(projectDetails.projectId, !isFavoriteEnabled);
    setIsFavoriteEnabled(!isFavoriteEnabled);
  };

  return (
    <>
      <MobileSizeProject project={project} />
      <FullSizeProject project={project} />
    </>
  );
};
