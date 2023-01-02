import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BScroll from 'better-scroll';

import Loading from '../loading';
import LoadingV2 from '../loadingV2';

import { debounce } from '../../api/utils';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
  const {
    direction,
    refresh,
    click,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState(null);
  // current 指向初始话bs实例需要的 Dom 元素
  const scrollContainerRef = useRef();

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      mouseWheel: true,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);

    return () => {
      setBScroll(null);
    };
  }, []);

  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);

  // 上拉到底判断,调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scroll', handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  // 下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    const handlePullDown = (pos) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on('touchEnd', handlePullDown);
    return () => {
      bScroll.off('touchEnd', handlePullDown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  // useEffect不传第二个参数，componentDidMount + componentDidUpdate
  useEffect(() => {
    // 每次重新渲染都要刷新实例，防止无法滑动:
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  const PullUpDisplayStyle = pullUpLoading
    ? { display: '' }
    : { display: 'none' };
  const PullDownDisplayStyle = pullDownLoading
    ? { display: '' }
    : { display: 'none' };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading />
      </PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDownDisplayStyle}>
        <LoadingV2 />
      </PullDownLoading>
    </ScrollContainer>
  );
});

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
};

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

export default Scroll;
