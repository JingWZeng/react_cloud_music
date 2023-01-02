import React, { useEffect, useState } from 'react';
import HorizontalItem from '../../baseUI/horizontalItem';
import { map } from 'lodash';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateEffect } from 'ahooks';

import { alphaTypes, singerTypes, singerAreaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '../../baseUI/scroll';
import {
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from '../../store/features/singers/requestAction';
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
} from '../../store/features/singers/singersSlice';
import Loading from '../../baseUI/loading';

function Singers(props) {
  const [singerArea, setSingerArea] = useState('');
  const [singerType, setSingerType] = useState('');
  const [alpha, setAlpha] = useState('');

  const dispatch = useDispatch();

  const {
    pageCount,
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
  } = useSelector((state) => state.singers);
  // 没有选择任何条件的时候调试热门歌手接口
  const isHot = singerType === '' && singerArea === '' && alpha === '';

  useEffect(() => {
    if (!singerList.length) {
      dispatch(getHotSingerList());
    }
  }, []);

  useUpdateEffect(() => {
    //  首次渲染不执行
    updateDispatch();
  }, [singerType, singerArea, alpha]);

  const handleUpdateSingerType = (type) => {
    setSingerType(type);
  };

  const handleUpdateSingerArea = (area) => {
    setSingerArea(area);
  };

  const handleUpdateAlpha = (alpha) => {
    setAlpha(alpha);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch();
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch();
  };

  // dispatch
  const updateDispatch = () => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));

    dispatch(
      getSingerList({
        type: singerType,
        area: singerArea,
        alpha,
      })
    );
  };

  // 滑到最底部刷新
  const pullUpRefreshDispatch = () => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (isHot) {
      dispatch(refreshMoreHotSingerList({ pageCount, singerList }));
    } else {
      dispatch(
        refreshMoreSingerList({
          type: singerType,
          area: singerArea,
          alpha,
          pageCount,
          singerList,
        })
      );
    }
  };

  // 顶部下拉刷新
  const pullDownRefreshDispatch = () => {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if (isHot) {
      dispatch(getHotSingerList());
    } else {
      dispatch(
        getSingerList({
          type: singerType,
          area: singerArea,
          alpha,
        })
      );
    }
  };

  const renderSingerList = () => {
    return (
      <List>
        {map(singerList, (singer, index) => {
          return (
            <ListItem key={singer.accountId + '' + index}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      width="100%"
                      height="100%"
                      src={require('./singer.png')}
                      alt="default-music"
                    />
                  }
                >
                  <img
                    src={`${singer.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{singer.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <>
      <NavContainer>
        <HorizontalItem
          list={singerTypes}
          title={'歌手类型:'}
          currValue={singerType}
          onClick={handleUpdateSingerType}
        />
        <HorizontalItem
          list={singerAreaTypes}
          title={'歌手地区:'}
          currValue={singerArea}
          onClick={handleUpdateSingerArea}
        />
        <HorizontalItem
          list={alphaTypes}
          title={'首字母:'}
          currValue={alpha}
          onClick={handleUpdateAlpha}
        />
      </NavContainer>
      <ListContainer>
        {enterLoading ? <Loading /> : null}
        <Scroll
          onScroll={forceCheck}
          pullDown={handlePullDown}
          pullUp={handlePullUp}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
    </>
  );
}

export default React.memo(Singers);
