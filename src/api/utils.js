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
