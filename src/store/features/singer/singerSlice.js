import { createSlice } from '@reduxjs/toolkit';
import { getSingerInfo } from './requestAction';

const initialState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

export const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {
    changeArtist(state, { payload }) {
      state.artist = payload;
    },
    changeSongsOfArtist(state, { payload }) {
      state.songsOfArtist = payload;
    },
    changeLoading(state, { payload }) {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSingerInfo.fulfilled, (state, { payload }) => {
      state.artist = payload.artist;
      state.songsOfArtist = payload.hotSongs;
      state.loading = false;
    });
  },
});

export const { changeArtist, changeSongsOfArtist, changeLoading } =
  singerSlice.actions;

export default singerSlice.reducer;
