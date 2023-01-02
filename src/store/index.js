import { configureStore } from '@reduxjs/toolkit';
import recommendReduce from './features/recommend/recommendSlice';
import singersReduce from './features/singers/singersSlice';
import rankReduce from './features/rank/rankSlice';

export const store = configureStore({
  reducer: {
    recommend: recommendReduce,
    singers: singersReduce,
    rank: rankReduce,
  },
});
