import { floor } from 'lodash';

const WAN = 10000;
const QIAN = 1000;
const YI = 10000000;

export const getCount = (count) => {
  if (count < 0) return;
  if (count < WAN) {
    return count;
  } else if (floor(count / WAN) < WAN) {
    return floor(count / QIAN) / 10 + '万';
  } else {
    return floor(count / YI) / 10 + '亿';
  }
};

// 防抖函数
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};
