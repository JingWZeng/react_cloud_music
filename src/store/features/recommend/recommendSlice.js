import { createSlice } from '@reduxjs/toolkit';
import {
  getBannerRequest,
  getRecommendListRequest,
} from '../../../api/request';

const initialState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
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
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload;
    },
  },
});

export const { changeBannerList, changeRecommendList, changeEnterLoading } =
  recommendSlice.actions;

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
      dispatch(changeEnterLoading(false));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default recommendSlice.reducer;
