import { createSlice } from '@reduxjs/toolkit';
import { getRankList } from './requestAction';

const initialState = {
  rankList: [],
  loading: true,
};

export const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    changeRankList(state, { payload }) {
      state.rankList = payload;
      state.loading = false;
    },
    changeLoading(state, { payload }) {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRankList.fulfilled, (state, { payload }) => {
      state.rankList = payload;
      state.loading = false;
    });
  },
});

export const { changeRankList, changeLoading } = rankSlice.actions;

export default rankSlice.reducer;
