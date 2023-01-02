import React, { useEffect, useState } from 'react';
import HorizontalItem from '../../baseUI/horizontalItem';
import { map } from 'lodash';

import { alphaTypes, singerTypes, singerAreaTypes } from '../../api/config';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '../../baseUI/scroll';
import {
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from '../../store/features/singers/requestAction';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
} from '../../store/features/singers/singersSlice';

function Singers(props) {
  const [singerArea, setSingerArea] = useState('');
  const [singerType, setSingerType] = useState('');
  const [alpha, setAlpha] = useState('');

  const { pageCount, singerList, pullUpLoading, pullDownLoading } = useSelector(
    (state) => state.singers
  );
  const dispatch = useDispatch();

  // 没有选择任何条件的时候调试热门歌手接口
  const isHot = singerType === '' && singerArea === '' && alpha === '';

  useEffect(() => {
    dispatch(getHotSingerList());
  }, []);

  const handleUpdateSingerArea = (area) => {
    setSingerArea(area);
    updateDispatch();
  };

  const handleUpdateSingerType = (type) => {
    setSingerType(type);
    updateDispatch();
  };

  const handleUpdateAlpha = (alpha) => {
    setAlpha(alpha);
    updateDispatch();
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
                <img
                  src={`${singer.picUrl}?param=300x300`}
                  width="100%"
                  height="100%"
                  alt="music"
                />
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
