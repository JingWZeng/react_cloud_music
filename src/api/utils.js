import { floor } from 'lodash';
import { RankTypes } from './config';

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

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 找出排行榜的编号
export const filterIdx = (name) => {
  for (const key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};
