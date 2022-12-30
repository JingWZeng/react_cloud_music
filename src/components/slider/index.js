import React, { useEffect, useState } from 'react';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { map } from 'lodash';

import { SliderContainer } from './style';
import 'swiper/css';
import 'swiper/css/pagination';

function Slider(props) {
  const { bannerList } = props;

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {map(bannerList, (item) => {
              return (
                <div className="swiper-slide" key={item.imageUrl}>
                  <div className="slider-nav">
                    <SwiperSlide>
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
          </Swiper>
        </div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
