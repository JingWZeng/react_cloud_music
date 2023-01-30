import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { prefixStyle } from './../../api/utils';
import { head, max, min } from 'lodash';

const progressBtnWidth = 8;

const ProgressBarWrapper = styled.div`
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`;

function ProgressBar(props) {
  const { onPercentChange } = props;
  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnRef = useRef();
  const [touch, setTouch] = useState({});

  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.initiated = true; //  true表示滑动开始
    startTouch.startX = head(e.touches).pageX;
    startTouch.left = progressRef.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    if (!touch.initiated) return;
    const deltaX = head(e?.touches).pageX - touch.startX;
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const offsetWidth = min([max([0, touch.left + deltaX]), barWidth]);
    _offset(offsetWidth);
    _changePercent();
  };

  const progressTouchEnd = () => {
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false; // 滑动结束
    setTouch(endTouch);
  };

  // 处理进度条的偏移
  const _offset = (offsetWidth) => {
    progressRef.current.style.width = `${offsetWidth}px`;
    progressBtnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
  };

  const handleClickProcess = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    _offset(offsetWidth);
    _changePercent();
  };

  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const currentPercent = progressRef.current.clientWidth / barWidth;
    onPercentChange(currentPercent);
  };

  return (
    <ProgressBarWrapper>
      <div
        className="bar-inner"
        ref={progressBarRef}
        onClick={handleClickProcess}
      >
        <div className="progress" ref={progressRef}></div>
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default React.memo(ProgressBar);
