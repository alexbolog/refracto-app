import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FullProjectPageDetails, ProjectPageDetails } from 'types/projectTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { ReactComponent as LeftArrow } from '../../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../../assets/icons/refracto/arrow_right_alt-2.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const MainCard = ({ project }: { project: ProjectPageDetails }) => {
  const carouselMovePrev = () => {
    const carouselId = 'img-slider';
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
    const carouselId = 'img-slider';
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
    <div className='card'>
      <div className='card-header b-0'>
        <div className='main-card-header'>
          <h1>{project.projectTitle}</h1>
          <h6>{project.shortDescription.substring(0, 150)}</h6>
          <button className='btn btn-social fb'>
            <FontAwesomeIcon icon={faFacebook as any} />
          </button>
          <button className='btn btn-social twt'>
            <FontAwesomeIcon icon={faTwitter as any} />
          </button>
        </div>
      </div>
      <div className='card-body'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          id='img-slider'
        >
          {project.images.map((imgSrc, i) => (
            <SwiperSlide key={`img-slider-slide-item-${i}`}>
              <img src={imgSrc} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className='btn-carousel left' onClick={carouselMovePrev}>
          <LeftArrow />
        </button>
        <button className='btn-carousel' onClick={carouselMoveNext}>
          <RightArrow />
        </button>
      </div>
    </div>
  );
};
