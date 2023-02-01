import { GeneralContext } from 'contexts/GeneralContext';
import React, { useContext } from 'react';
import ProjectCardCarousel from './ProjectCarousel';

export const SuggestedProjectsCarousel = () => {
  const { accountOverview } = useContext(GeneralContext);
  return (
    <ProjectCardCarousel
      title={'Suggested Projects'}
      projects={accountOverview?.suggestedProjects || []}
      isFavoritesOnly={true}
    />
  );
};
