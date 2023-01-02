import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBannerRequest,
  getRecommendListRequest,
} from '../../../api/request';

export const getBannerList = createAsyncThunk('recommend/getBannerList', () => {
  return getBannerRequest();
});

export const getRecommendList = createAsyncThunk(
  'recommend/getRecommendList',
  () => {
    return getRecommendListRequest();
  }
);
