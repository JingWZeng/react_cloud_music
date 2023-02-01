import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import animations from 'create-keyframe-animation';

import { getName, prefixStyle, formatPlayTime } from '../../../api/utils';
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
} from './style';
import ProgressBar from '../../../baseUI/processBar';

const transform = prefixStyle('transform');

function NormalPlayer(props) {
  const {
    song,
    fullScreen,
    playing,
    percent,
    currentTime,
    duration,
    toggleFullScreen,
    clickPlaying,
    onPercentChange,
    onPrev,
    onNext,
  } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

  // 启用帧动画
  const enter = () => {
    normalPlayerRef.current.style.display = 'block';
    const cdWrapperDom = cdWrapperRef.current;
    const { x, y, scale } = _getPosAndScale();

    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`,
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`,
      },
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    animations.runAnimation(cdWrapperDom, 'move');
  };
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  };

  const leave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (!cdWrapperDom) return;
    cdWrapperDom.style.transition = 'all 0.4s';
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transform
    ] = `translate3d (${x}px, ${y}px, 0) scale(${scale})`;
  };

  const afterLeave = () => {
    const cdWrapperDom = cdWrapperRef.current;
    if (!cdWrapperDom) return;
    cdWrapperDom.style.transition = '';
    cdWrapperDom.style[transform] = '';
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = 'none';
  };

  // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale,
    };
  };

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + '?param=300x300'}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>

        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>

        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image play ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + '?param=400x400'}
                alt="音碟"
              />
            </div>
          </CDWrapper>
        </Middle>

        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                onPercentChange={onPercentChange}
              ></ProgressBar>
            </div>
            <div className="time time-r">{formatPlayTime(duration)}</div>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left" onClick={onPrev}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={(e) => clickPlaying(e, !playing)}
                dangerouslySetInnerHTML={{
                  __html: playing ? '&#xe723;' : '&#xe731;',
                }}
              ></i>
            </div>
            <div className="icon i-right" onClick={onNext}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}

NormalPlayer.propTypes = {
  song: PropTypes.object,
  fullScreen: PropTypes.bool,
  playing: PropTypes.bool,
  percent: PropTypes.number,
  duration: PropTypes.number, // 总时长
  currentTime: PropTypes.number, // 播放时间
  toggleFullScreen: PropTypes.func,
  clickPlaying: PropTypes.func,
  onPercentChange: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
};

export default React.memo(NormalPlayer);
