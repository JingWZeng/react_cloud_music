import { configureStore } from '@reduxjs/toolkit';
import recommendReduce from './features/recommend/recommendSlice';

export const store = configureStore({
  reducer: {
    recommend: recommendReduce,
  },
});
