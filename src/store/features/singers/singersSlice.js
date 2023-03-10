import { createSlice } from '@reduxjs/toolkit';
import {
  getHotSingerList,
  getSingerList,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
} from './requestAction';

const initialState = {
  singerList: [],
  enterLoading: true, // 控制进场Loading
  pullUpLoading: false, // 控制上拉加载动画
  pullDownLoading: false, // 控制下拉加载动画
  pageCount: 0, // 这里是当前页数，我们即将实现分页功能
};

export const singersSlice = createSlice({
  name: 'singers',
  initialState,
  reducers: {
    changeSingerList(state, { payload }) {
      state.singerList = payload;
    },
    changePageCount(state, { payload }) {
      state.pageCount = payload;
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload;
    },
    changePullUpLoading(state, { payload }) {
      state.pullUpLoading = payload;
    },
    changePullDownLoading(state, { payload }) {
      state.pullDownLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHotSingerList.fulfilled, (state, { payload }) => {
      state.singerList = payload;
      state.enterLoading = false;
      state.pullDownLoading = false;
    });
    // 更多 上拉
    builder.addCase(
      refreshMoreHotSingerList.fulfilled,
      (state, { payload }) => {
        state.singerList = payload;
        state.pullUpLoading = false;
      }
    );
    builder.addCase(getSingerList.fulfilled, (state, { payload }) => {
      state.singerList = payload;
      state.enterLoading = false;
      state.pullDownLoading = false;
    });
    // 更多 上拉
    builder.addCase(refreshMoreSingerList.fulfilled, (state, { payload }) => {
      state.singerList = payload;
      state.pullUpLoading = false;
    });
  },
});

export const {
  changeSingerList,
  changePageCount,
  changeEnterLoading,
  changePullDownLoading,
  changePullUpLoading,
} = singersSlice.actions;

export default singersSlice.reducer;
