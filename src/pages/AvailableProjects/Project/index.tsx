import React, { useContext } from 'react';
import { ProjectListItem } from 'types/projectTypes';
import './style.css';
import { FullSizeProject } from './FullSizeProject';
import { MobileSizeProject } from './MobileSizeProject';
import { AccountContext } from 'contexts/AccountContext';
import {
  deleteFavoriteProject,
  createFavoriteProject
} from 'db/favoriteProjects';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';

export const Project = ({ project }: { project: ProjectListItem }) => {
  const { address } = useGetAccountInfo();
  const { accountOverview, refreshAccountOverview } =
    useContext(AccountContext);
  const [isFavoriteEnabled, setIsFavoriteEnabled] = React.useState(
    accountOverview?.favoriteProjects.find(
      (p) => p.projectId === project.projectId
    ) !== undefined
  );

  const toggleFavorite = async () => {
    if (isFavoriteEnabled) {
      await deleteFavoriteProject(address, project.projectId);
    } else {
      await createFavoriteProject(address, project.projectId);
    }
    await refreshAccountOverview();
    setIsFavoriteEnabled((prev) => !prev);
  };
  return (
    <>
      <MobileSizeProject
        project={project}
        isFavoriteEnabled={isFavoriteEnabled}
        toggleFavorite={toggleFavorite}
      />
      <FullSizeProject
        project={project}
        isFavoriteEnabled={isFavoriteEnabled}
        toggleFavorite={toggleFavorite}
      />
    </>
  );
};
