import { createSlice } from '@reduxjs/toolkit';
import { getAlbumDetail } from './requestAction';

const initialState = {
  currentAlbum: {},
  enterLoading: true,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    changeCurrentAlbum(state, { payload }) {
      state.currentAlbum = payload;
      state.enterLoading = false;
    },
    changeEnterLoading(state, { payload }) {
      state.enterLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumDetail.fulfilled, (state, { payload }) => {
      state.currentAlbum = payload;
      state.enterLoading = false;
    });
  },
});

export const { changeCurrentAlbum, changeEnterLoading } = albumSlice.actions;

export default albumSlice.reducer;
