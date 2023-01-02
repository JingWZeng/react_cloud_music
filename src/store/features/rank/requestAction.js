import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRankListRequest } from '../../../api/request';

export const getRankList = createAsyncThunk('rank/getRankList', async () => {
  const res = await getRankListRequest();
  return res.list;
});
