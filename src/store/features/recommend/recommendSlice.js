import { createSlice } from '@reduxjs/toolkit';
import { getBannerList, getRecommendList } from './requestAction';

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
  // 用法1，对ts支持不友好并且可能未来放弃该用法
  // extraReducers: {
  //   [getBannerList.fulfilled](state, { payload }) {
  //     state.bannerList = payload;
  //   },
  //   [getBannerList.rejected](state, { payload }) {
  //     state.bannerList = [];
  //   },
  // },

  // ts友好，官方推荐用法
  extraReducers: (builder) => {
    builder.addCase(getBannerList.fulfilled, (state, { payload }) => {
      state.bannerList = payload;
    });
    builder.addCase(getRecommendList.fulfilled, (state, { payload }) => {
      state.recommendList = payload;
      state.enterLoading = false;
    });
  },
});

export const { changeBannerList, changeRecommendList, changeEnterLoading } =
  recommendSlice.actions;

export default recommendSlice.reducer;
