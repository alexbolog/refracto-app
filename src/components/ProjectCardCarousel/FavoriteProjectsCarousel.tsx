import { GeneralContext } from 'contexts/GeneralContext';
import React, { useContext } from 'react';
import { SuggestedProject } from 'types/accountTypes';
import ProjectCardCarousel from './ProjectCarousel';

export const FavoriteProjectCarousel = () => {
  const { accountOverview } = useContext(GeneralContext);

  return (
    <ProjectCardCarousel
      title={'Favorite Projects'}
      projects={(accountOverview?.favoriteProjects || []).map((fp) => {
        const t = fp as SuggestedProject;
        t.isFavorite = true;
        return t;
      })}
      isFavoritesOnly={true}
    />
  );
};
