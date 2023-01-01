import React, { useEffect, useState } from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { map } from 'lodash';

import { SliderContainer } from './style';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Slider(props) {
  const { bannerList } = props;

  return (
    <SliderContainer>
      <div className="before"></div>
      {/*  Swiper 组件必须在最外面，否则autoPlay可能失效 */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="slider-container">
          <div className="swiper-wrapper">
            {map(bannerList, (item) => {
              return (
                <div className="swiper-slide" key={item.imageUrl}>
                  <div className="slider-nav">
                    <SwiperSlide key={item.imageUrl}>
                      <img
                        src={item.imageUrl}
                        width="100%"
                        height="100%"
                        alt="推荐"
                      />
                    </SwiperSlide>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Swiper>
    </SliderContainer>
  );
}

export default React.memo(Slider);
