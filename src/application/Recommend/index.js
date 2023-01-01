import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { forceCheck } from 'react-lazyload';

import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';

import {
  getBannerList,
  getRecommendList,
} from '../../store/features/recommend/recommendSlice';

import { Content } from './style';
import Loading from '../../baseUI/loading';

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = useSelector(
    (state) => state.recommend
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerList());
    }
    if (!recommendList.length) {
      dispatch(getRecommendList());
    }
  }, []);

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
    </Content>
  );
}

export default React.memo(Recommend);
