import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ImageGallery = ({
  images,
  roundedTop
}: {
  images: string[];
  roundedTop?: boolean;
}) => {
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
    <div style={{ minHeight: 100 }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        id='img-slider'
      >
        {images.map((imgSrc, i) => (
          <SwiperSlide
            key={`img-slider-slide-item-${i}`}
            className='w-100 d-flex justify-content-center align-items-center'
          >
            <img src={imgSrc} className={roundedTop ? 'rounded-top' : ''} />
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
  );
};
