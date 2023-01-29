import { createAsyncThunk } from '@reduxjs/toolkit';

import { getSingerInfoRequest } from '../../../api/request';

export const getSingerInfo = createAsyncThunk(
  'singer/getSingerInfo',
  async (thunkArg) => {
    const { id } = thunkArg;
    return await getSingerInfoRequest(id);
  }
);
