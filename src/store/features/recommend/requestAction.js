import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBannerRequest,
  getRecommendListRequest,
} from '../../../api/request';

export const getBannerList = createAsyncThunk(
  'recommend/getBannerList',
  async () => {
    const res = await getBannerRequest();
    return res.banners;
  }
);

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  async () => {
    const res = await getRecommendListRequest();
    return res.result;
  }
);
