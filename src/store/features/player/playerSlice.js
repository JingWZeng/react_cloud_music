import { createSlice } from '@reduxjs/toolkit';
import { playMode } from '../../../api/config';

const initialState = {
  fullScreen: false, // 播放器是否为全屏模式
  playing: false, // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
  playList: [],
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前歌曲在播放列表的索引位置
  showPlayList: false, // 是否展示播放列表
  currentSong: {},
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeFullScreen(state, { payload }) {
      state.fullScreen = payload;
    },
    changePlaying(state, { payload }) {
      state.playing = payload;
    },
    changeSequencePlayList(state, { payload }) {
      state.sequencePlayList = payload;
    },
    changePlayList(state, { payload }) {
      state.playList = payload;
    },
    changeMode(state, { payload }) {
      state.mode = payload;
    },
    changeCurrentIndex(state, { payload }) {
      state.currentIndex = payload;
    },
    changeShowPlayList(state, { payload }) {
      state.showPlayList = payload;
    },
    changeCurrentSong(state, { payload }) {
      state.currentSong = payload;
    },
  },
});

export const {
  changePlaying,
  changeCurrentIndex,
  changeCurrentSong,
  changeFullScreen,
  changeMode,
  changePlayList,
  changeShowPlayList,
  changeSequencePlayList,
} = playerSlice.actions;
export default playerSlice.reducer;
