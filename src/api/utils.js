import { floor, map, join } from 'lodash';
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

export const getName = (lists) => {
  const nameList = map(lists, (item) => item.name);
  const result = join(nameList, '/');
  return result;
};

// 判断一个对象是否为空
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0;

// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
const elementStyle = document.createElement('div').style;

const vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (const key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = (playTime) => {
  playTime = playTime | 0; // |0 向下取整
  const minutes = (playTime / 60) | 0;
  const seconds = (playTime % 60).toString().padStart(2, '0'); // 4 ---> 04
  return `${minutes}:${seconds}`;
};
