import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../../api/request';
import { concat } from 'lodash';

// 第一次加载热门歌手
export const getHotSingerList = createAsyncThunk(
  'singers/getHotSingerList',
  async () => {
    const res = await getHotSingerListRequest(0);
    return res.artists;
  }
);

// 加载更多热门歌手
export const refreshMoreHotSingerList = createAsyncThunk(
  'singers/refreshMoreHotSingerList',
  async (thunkArg) => {
    const { pageCount, singerList } = thunkArg;
    const res = await getHotSingerListRequest(pageCount);
    return concat(singerList, res.artists);
  }
);

// 第一次加载对应类别的歌手
export const getSingerList = createAsyncThunk(
  'singers/getSingerList',
  async (thunkArg) => {
    const { type, area, alpha } = thunkArg;
    const res = await getSingerListRequest(type, area, alpha, 0);
    return res.artists;
  }
);

// 加载更多歌手
export const refreshMoreSingerList = createAsyncThunk(
  'singers/refreshMoreSingerList',
  async (thunkArg) => {
    const { type, area, alpha, pageCount, singerList } = thunkArg;
    const res = await getSingerListRequest(type, area, alpha, pageCount);
    return concat(singerList, res.artists);
  }
);
