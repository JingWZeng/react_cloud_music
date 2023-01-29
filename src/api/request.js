import { axiosInstance } from './config';
import { pickBy } from 'lodash';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (type, area, alpha, count) => {
  const res = {
    type,
    area,
    alpha: alpha.toLowerCase(),
    offset: count,
  };
  const params = pickBy(res, (value) => value !== '');
  return axiosInstance.get(`/artist/list`, {
    params,
  });
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};
