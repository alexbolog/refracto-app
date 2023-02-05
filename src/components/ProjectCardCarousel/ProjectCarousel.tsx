import React from 'react';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';
import ProjectCardItem from './ProjectCardItem';
import { SuggestedProject } from 'types/accountTypes';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectCardCarousel = ({
  title,
  projects,
  isFavoritesOnly
}: {
  title: string;
  projects: SuggestedProject[];
  isFavoritesOnly: boolean;
}) => {
  const [width, setWidth] = React.useState<number>(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleToggleFavorite = (projectId: string, isFavorite: boolean) => {
    window.alert(`${projectId} is favorite: ${isFavorite}`);
  };
  const carouselMovePrev = () => {
    const carouselId = isFavoritesOnly ? 'fav-swiper' : 'sgst-swiper';
    const elements = document.getElementsByClassName('swiper-button-prev');
    for (let i = 0; i < elements.length; i++) {
      const parentId = elements[i].parentElement?.id;
      if (parentId === carouselId) {
        const el = elements[i] as HTMLInputElement;
        el.click();
      }
    }
  };
  const carouselMoveNext = () => {
    const carouselId = isFavoritesOnly ? 'fav-swiper' : 'sgst-swiper';
    const elements = document.getElementsByClassName('swiper-button-next');
    for (let i = 0; i < elements.length; i++) {
      const parentId = elements[i].parentElement?.id;
      if (parentId === carouselId) {
        const el = elements[i] as HTMLInputElement;
        el.click();
      }
    }
  };

  return (
    <div className='container w-100'>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 col-md-12 d-flex justify-content-between'>
          <div>
            <h3>
              <strong>{title}</strong>
            </h3>
          </div>
          <div>
            {projects.length > 4 && (
              <>
                <button
                  style={{
                    background: 'white',
                    borderRadius: '0.625rem',
                    border: '1px #D5DFE7 solid',
                    padding: '0.5rem',
                    marginRight: '10px'
                  }}
                  onClick={carouselMovePrev}
                >
                  <LeftArrow />
                </button>
                <button
                  style={{
                    background: 'white',
                    borderRadius: '0.625rem',
                    border: '1px #D5DFE7 solid',
                    padding: '0.5rem'
                  }}
                  onClick={carouselMoveNext}
                >
                  <RightArrow />
                </button>
              </>
            )}
          </div>
        </div>
        <div className='col-12 mt-3'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={20}
            slidesPerView={width <= 768 ? 1 : 4}
            navigation={true}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            id={isFavoritesOnly ? 'fav-swiper' : 'sgst-swiper'}
          >
            {projects.map((project, i) => (
              <SwiperSlide
                key={`${isFavoritesOnly ? 'fav' : 'sgg'}-slide-item-${i}`}
              >
                <ProjectCardItem
                  projectDetails={project}
                  onToggleFavorite={handleToggleFavorite}
                  isButtonOutline={!isFavoritesOnly}
                  buttonText={isFavoritesOnly ? 'Invest' : 'View Details'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardCarousel;
