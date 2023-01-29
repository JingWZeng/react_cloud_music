import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../baseUI/header';
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper,
} from './style';
import Scroll from '../../baseUI/scroll';
import SongsList from '../SongList';
import { HEADER_HEIGHT } from '../Album';
import { getSingerInfo } from '../../store/features/singer/requestAction';
import Loading from '../../baseUI/loading';
import {
  changeArtist,
  changeLoading,
  changeSongsOfArtist,
} from '../../store/features/singer/singerSlice';

// 往上偏移的尺寸，露出圆角
const OFFSET = 5;

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { artist, songsOfArtist, loading } = useSelector(
    (state) => state.singer
  );

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  // 图片初始高度
  const initialHeight = useRef(0);

  useEffect(() => {
    const h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  useEffect(() => {
    dispatch(changeArtist([]));
    dispatch(changeSongsOfArtist([]));
    dispatch(changeLoading(true));
    dispatch(
      getSingerInfo({
        id,
      })
    );
  }, []);

  const handleOnExited = () => {
    navigate('/singers');
  };

  const handleScroll = useCallback((pos) => {
    const imageHeight = initialHeight.current;
    const newY = pos.y;
    const imageElem = imageWrapper.current;
    const buttonElem = collectButton.current;
    const headerElem = header.current;
    const layerElem = layer.current;
    const minScrollY = -(imageHeight - OFFSET) + HEADER_HEIGHT;

    // 指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / imageHeight);
    if (newY > 0) {
      // 往下拉
      imageElem.style.transform = `scale(${1 + percent})`;
      buttonElem.style.transform = `translate3d (0, ${newY}px, 0)`;
      layerElem.style.top = `${imageHeight - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 往上滑动，但是遮罩还没超过 Header 部分
      layerElem.style.top = `${imageHeight - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      layerElem.style.zIndex = 1;
      imageElem.style.paddingTop = '75%';
      imageElem.style.height = 0;
      imageElem.style.zIndex = -1;
      // 按钮跟着移动且渐渐变透明
      buttonElem.style.transform = `translate3d (0, ${newY}px, 0)`;
      buttonElem.style.opacity = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是遮罩超过 Header 部分
      layerElem.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerElem.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerElem.style.zIndex = 100;
      // 此时图片高度与 Header 一致
      imageElem.style.height = `${HEADER_HEIGHT}px`;
      imageElem.style.paddingTop = 0;
      imageElem.style.zIndex = 99;
    }
  }, []);

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={handleOnExited}
    >
      <Container>
        <Header title={'头部'} ref={header} onClick={handleBack}></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList songs={songsOfArtist} showCollect={false}></SongsList>
          </Scroll>
        </SongListWrapper>
        {loading ? <Loading /> : null}
      </Container>
    </CSSTransition>
  );
}

export default Singer;
