import { GeneralContext } from 'contexts/GeneralContext';
import React, { useContext, useEffect } from 'react';
import ProjectCardCarousel from './ProjectCarousel';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const SuggestedProjectsCarousel = () => {
  const { accountOverview } = useContext(GeneralContext);
  return (
    <ProjectCardCarousel
      title={'Suggested Projects'}
      projects={accountOverview?.suggestedProjects || []}
      isFavoritesOnly={false}
    />
  );
};
