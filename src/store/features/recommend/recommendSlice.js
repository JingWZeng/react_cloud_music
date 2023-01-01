import { createSlice } from '@reduxjs/toolkit';
import {
  getBannerRequest,
  getRecommendListRequest,
} from '../../../api/request';

const initialState = {
  bannerList: [],
  recommendList: [],
};

export const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerList(state, { payload }) {
      state.bannerList = payload;
    },
    changeRecommendList(state, { payload }) {
      state.recommendList = payload;
    },
  },
});

export const { changeBannerList, changeRecommendList } = recommendSlice.actions;

export const getBannerList = () => (dispatch) => {
  getBannerRequest()
    .then((data) => {
      dispatch(changeBannerList(data.banners));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getRecommendList = () => (dispatch) => {
  getRecommendListRequest()
    .then((data) => {
      dispatch(changeRecommendList(data.result));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default recommendSlice.reducer;
