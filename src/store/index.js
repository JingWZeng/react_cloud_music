import { configureStore } from '@reduxjs/toolkit';
import recommendReduce from './features/recommend/recommendSlice';
import singersReduce from './features/singers/singersSlice';
import rankReduce from './features/rank/rankSlice';
import albumReduce from './features/album/albumSlice';
import singerReduce from './features/singer/singerSlice';
import playerReduce from './features/player/playerSlice';

export const store = configureStore({
  reducer: {
    recommend: recommendReduce,
    singers: singersReduce,
    rank: rankReduce,
    album: albumReduce,
    singer: singerReduce,
    player: playerReduce,
  },
});
