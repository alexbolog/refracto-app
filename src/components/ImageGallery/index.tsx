import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { ReactComponent as LeftArrow } from '../../assets/icons/refracto/arrow_right_alt-3.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/refracto/arrow_right_alt-2.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const ImageGallery = ({ images }: { images: string[] }) => {
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
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        id='img-slider'
      >
        {images.map((imgSrc, i) => (
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
    </>
  );
};
