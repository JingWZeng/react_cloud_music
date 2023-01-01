import React, { useEffect, useRef } from 'react';
import { map } from 'lodash';
import { Provider, useSelector, useDispatch } from 'react-redux';

import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../components/scroll';

import {
  getBannerList,
  getRecommendList,
} from '../../store/features/recommend/recommendSlice';

import { Wrapper } from './style';

function Recommend(props) {
  const scrollRef = useRef();

  const { bannerList, recommendList } = useSelector((state) => state.recommend);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannerList());
    dispatch(getRecommendList());
  }, []);

  return (
    <Wrapper>
      <Scroll className="list" ref={scrollRef}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Wrapper>
  );
}

export default React.memo(Recommend);
